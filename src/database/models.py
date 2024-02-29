from sqlalchemy import Boolean, Column, Integer, String, DateTime, func, ForeignKey
from database import Base
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True)
    password = Column(String(20))
    
    posts = relationship("Post", back_populates="user")

class Post(Base):
    __tablename__ = 'posts'
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(50))
    content = Column(String(1000))
    user_id = Column(String(50), ForeignKey("users.username"), nullable=False)
    bb_code = Column(Integer, ForeignKey("boards.id"), nullable=False)
    created_date = Column(DateTime)
    
    user = relationship("User", back_populates="posts")
    board = relationship("BulletinBoard", back_populates="posts")

class BulletinBoard(Base):
    __tablename__ = 'boards'
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50))
    
    posts = relationship("Post", back_populates="board")