from sqlalchemy.orm import Session
from .models import Task, TaskCreate, TaskUpdate

def get_tasks(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Task).offset(skip).limit(limit).all()

def create_task(db: Session, task: TaskCreate):
    db_task = Task(text=task.text, completed=task.completed)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

def get_task(db: Session, task_id: int):
    return db.query(Task).filter(Task.id == task_id).first()

def update_task(db: Session, task_id: int, task: TaskUpdate):
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if db_task:
        db_task.text = task.text
        db_task.completed = task.completed
        db.commit()
        db.refresh(db_task)
    return db_task

def delete_task(db: Session, task_id: int):
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if db_task:
        db.delete(db_task)
        db.commit()
    return db_task
