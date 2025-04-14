from pydantic import BaseModel

# Base class for ToDo models
class ToDoBase(BaseModel):
    title: str
    completed: bool = False

# Schema for creating a To-Do item (inherits from ToDoBase)
class ToDoCreate(ToDoBase):
    pass

# Schema for updating a To-Do item (inherits from ToDoBase)
class ToDoUpdate(ToDoBase):
    pass

# Schema for returning a To-Do item (inherits from ToDoBase)
class ToDoOut(ToDoBase):
    id: int

    class Config:
        orm_mode = True  # This tells Pydantic to work with SQLAlchemy models
