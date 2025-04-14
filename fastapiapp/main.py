from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import crud, models, schemas
from .database import SessionLocal, engine

# Create all the tables in the database (if not already created)
models.Base.metadata.create_all(bind=engine)

app = FastAPI()


@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Create a new To-Do item
@app.post("/todos/", response_model=schemas.ToDoOut)
def create(todo: schemas.ToDoCreate, db: Session = Depends(get_db)):
    return crud.create_todo(db, todo)

# Get all To-Do items
@app.get("/todos/", response_model=list[schemas.ToDoOut])
def read_all(db: Session = Depends(get_db)):
    return crud.get_all_todos(db)

# Get a single To-Do item by ID
@app.get("/todos/{todo_id}", response_model=schemas.ToDoOut)
def read_one(todo_id: int, db: Session = Depends(get_db)):
    db_todo = crud.get_todo(db, todo_id)
    if db_todo is None:
        raise HTTPException(status_code=404, detail="To-Do not found")
    return db_todo

# Update a To-Do item by ID
@app.put("/todos/{todo_id}", response_model=schemas.ToDoOut)
def update(todo_id: int, todo: schemas.ToDoUpdate, db: Session = Depends(get_db)):
    return crud.update_todo(db, todo_id, todo)

# Delete a To-Do item by ID
@app.delete("/todos/{todo_id}")
def delete(todo_id: int, db: Session = Depends(get_db)):
    crud.delete_todo(db, todo_id)
    return {"ok": True}

# Filter To-Do items by completed status
@app.get("/todos/filter/{completed}", response_model=list[schemas.ToDoOut])
def filter_tasks(completed: bool, db: Session = Depends(get_db)):
    return crud.filter_todos(db, completed)
