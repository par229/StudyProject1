from fastapi import FastAPI, HTTPException, Depends, status
from pydantic import BaseModel, Field
from typing import Annotated
import models
from database import engine, SessionLocal
from sqlalchemy.orm import Session
from datetime import datetime

app = FastAPI()
models.Base.metadata.create_all(bind=engine)

#Get, Post, Put, Delete

class PostBase(BaseModel):
  title: str
  content: str
  user_id: str
  BB_code: int
  created_date: datetime = Field(default_factory=datetime.now)
  
class UserBase(BaseModel):
  username: str
  password: str
  
class BBBase(BaseModel):
  name: str

def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()

db_dependency = Annotated[Session, Depends(get_db)]

@app.post("/posts/", status_code=status.HTTP_201_CREATED)
async def create_post(post: PostBase, db:db_dependency):
  db_post = models.Post(**post.dict())
  db.add(db_post)
  db.commit()
#post data 생성

@app.get("/posts/{post_id}", status_code=status.HTTP_200_OK)
async def read_post(post_id: int, db: db_dependency):
  post = db.query(models.Post).filter(models.Post.id == post_id).first()
  if post is None:
    raise HTTPException(status_code=404, detail='Post not found')
  return post
#post data fetch by post_id

@app.get("/posts/{user_id}", status_code=status.HTTP_200_OK)
async def read_post(user_id: str, db: db_dependency):
  post = db.query(models.Post).filter(models.Post.id == user_id)
  if post is None:
    raise HTTPException(status_code=404, detail='Post not found')
  return post
#post data fetch by user_id

@app.delete("/posts/{post_id}", status_code=status.HTTP_200_OK)
async def delete_post(post_id: int, db: db_dependency):
  db_post = db.query(models.Post).filter(models.Post.id == post_id).first()
  if db_post is None:
    raise HTTPException(status_code=404, detail='Post not found')
  db.delete(db_post)
  db.commit()
#post data delete

@app.post("/users/", status_code=status.HTTP_201_CREATED)
async def create_user(user: UserBase, db: db_dependency):
  db_user = models.User(**user.dict())
  db.add(db_user)
  db.commit()
#user data 생성

@app.get("/users/{user_id}", status_code=status.HTTP_200_OK)
async def read_user(user_id: int, db: db_dependency):
  user = db.query(models.User).filter(models.User.id == user_id).first()
  if user is None:
    raise HTTPException(status_code=404, detail='User not found')
  return user
#user data fetch

@app.post("/boards/", status_code=status.HTTP_201_CREATED)
async def create_board(bulletin_board: BBBase, db: db_dependency):
  db_BB = models.BulletinBoard(**bulletin_board.dict())
  db.add(db_BB)
  db.commit()
#게시판 data 생성

@app.get("/boards/{bb_name}", status_code=status.HTTP_200_OK)
async def read_user(bb_name: str, db: db_dependency):
  bboard= db.query(models.BulletinBoard).filter(models.BulletinBoard.name == bb_name).first()
  if bb_name is None:
    raise HTTPException(status_code=404, detail='User not found')
  return bboard
#게시판 id fetch