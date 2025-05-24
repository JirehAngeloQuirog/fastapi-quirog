from pydantic import BaseModel
from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Task(Base):
    __tablename__ = 'tasks'

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String, index=True)
    completed = Column(Boolean, default=False)

class TaskCreate(BaseModel):
    text: str
    completed: bool = False

class TaskUpdate(BaseModel):
    text: str
    completed: bool
