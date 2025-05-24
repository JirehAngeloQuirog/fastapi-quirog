from fastapi import FastAPI, Depends
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import DeclarativeMeta
from sqlalchemy.orm import sessionmaker, Session
from .models import TaskCreate, TaskUpdate, Task
from .crud import get_tasks, create_task, get_task, update_task, delete_task

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"  # For SQLite; replace with PostgreSQL for production

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": '/docs'}

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/tasks/")
def read_tasks(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return get_tasks(db=db, skip=skip, limit=limit)

@app.post("/tasks/")
def create_new_task(task: TaskCreate, db: Session = Depends(get_db)):
    return create_task(db=db, task=task)

@app.get("/tasks/{task_id}")
def read_task(task_id: int, db: Session = Depends(get_db)):
    return get_task(db=db, task_id=task_id)

@app.put("/tasks/{task_id}")
def update_existing_task(task_id: int, task: TaskUpdate, db: Session = Depends(get_db)):
    return update_task(db=db, task_id=task_id, task=task)

@app.delete("/tasks/{task_id}")
def delete_existing_task(task_id: int, db: Session = Depends(get_db)):
    return delete_task(db=db, task_id=task_id)
