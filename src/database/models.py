from sqlalchemy import Boolean, Column, Integer, String, DateTime, func
from database import Base

class User(Base):
    __tablename__ = 'users'
  
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True)
    password = Column(String(20))
  
class Post(Base):
    __tablename__ = 'posts'
  
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(50))
    content = Column(String(100))
    user_id = Column(Integer)
    BB_code = Column(Integer)
    created_date = Column(DateTime)
