from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from models import Base, engine, SessionLocal, User, Post # User, Post 모델 import 추가
from pydantic import BaseModel
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import List

app = FastAPI()

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class UserCreate(BaseModel):
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES) # 수정됨
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@app.post("/signup/", status_code=status.HTTP_201_CREATED)
async def signup(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    hashed_password = get_password_hash(user.password)
    db_user = User(email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return {"email": user.email, "message": "User created successfully."}

@app.post("/login/")
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

class PostModel(BaseModel):
    id: int
    title: str
    content: str

    class Config:
        from_attributes = True

@app.get("/boards/{board_id}/posts/", response_model=List[PostModel])
async def read_posts(board_id: int, skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    posts = db.query(Post).filter(Post.board_id == board_id).offset(skip).limit(limit).all()
    return posts

class PostCreate(BaseModel):
    title: str
    content: str
    board_id: int

@app.post("/posts/", response_model=PostModel, status_code=status.HTTP_201_CREATED)
async def create_post(post: PostCreate, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    # 토큰으로부터 사용자 식별
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_email = payload.get("sub")
        if user_email is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid user")
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    user = db.query(User).filter(User.email == user_email).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    new_post = Post(**post.dict(), user_id=user.id) # Post 모델에 user_id 필드 추가 필요
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post

@app.delete("/posts/{post_id}/", status_code=status.HTTP_204_NO_CONTENT)
async def delete_post(post_id: int, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    # 토큰 검증 및 사용자 식별 로직...
    user_email = "user_identified_from_token@example.com"  # 예시
    user = db.query(User).filter(User.email == user_email).first()
    
    post = db.query(Post).filter(Post.id == post_id).first()
    if post is None or post.user_id != user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found or not authorized to delete")

    db.delete(post)
    db.commit()
    return {"message": "Post deleted successfully"}