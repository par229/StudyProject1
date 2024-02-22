from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

URL_DATABASE = 'mysql+pymysql://root:rlaguswls@localhost:3306/blogapplication'

engine = create_engine(URL_DATABASE)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

"""
declarative_base는 SQLAlchemy에서 사용되는 Base 클래스를 생성하기 위한 함수입니다. 이 클래스는 SQLAlchemy의 ORM을 사용할 때 모든 클래스의 부모 클래스 역할을 합니다. 즉, 모든 데이터베이스 테이블에 대한 클래스를 정의할 때 이 클래스를 상속받게 됩니다.
"""