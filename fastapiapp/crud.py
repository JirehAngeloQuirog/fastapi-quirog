from sqlalchemy.orm import Session
from . import models, schemas

# Get all To-Do items
def get_all_todos(db: Session):
    return db.query(models.ToDo).all()

# Get a single To-Do item by ID
def get_todo(db: Session, todo_id: int):
    return db.query(models.ToDo).filter(models.ToDo.id == todo_id).first()

# Create a new To-Do item
def create_todo(db: Session, todo: schemas.ToDoCreate):
    db_todo = models.ToDo(**todo.dict())  # Create a new ToDo from the schema
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)  # Refresh to get the updated data after commit
    return db_todo

# Update a To-Do item by ID
def update_todo(db: Session, todo_id: int, updated_data: schemas.ToDoUpdate):
    db_todo = get_todo(db, todo_id)
    if db_todo:
        for key, value in updated_data.dict(exclude_unset=True).items():  # Avoid overwriting unset values
            setattr(db_todo, key, value)
        db.commit()
        db.refresh(db_todo)
    return db_todo

# Delete a To-Do item by ID
def delete_todo(db: Session, todo_id: int):
    db_todo = get_todo(db, todo_id)
    if db_todo:
        db.delete(db_todo)
        db.commit()
    return db_todo

# Filter To-Do items by their completed status
def filter_todos(db: Session, completed: bool):
    return db.query(models.ToDo).filter(models.ToDo.completed == completed).all()
