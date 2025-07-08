import uvicorn
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from sqlalchemy.orm import Session

from routes import auth
from routes import user
from database import get_db
from models import User
from auth.auth_handler import get_current_active_user

# Task schemas
class TaskBase(BaseModel):
    title: str
    description: str | None = None
    completed: bool = False

class TaskCreate(TaskBase):
    pass

class Task(TaskBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True

class TaskUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    completed: bool | None = None

app = FastAPI(title="TodoList API", version="1.0.0")

# CORS configuration
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["authentication"])
app.include_router(user.router, prefix="/users", tags=["users"])

# In-memory storage for tasks (replace with database in production)
tasks_db = {}

@app.get("/")
def read_root():
    return {"message": "Welcome to TodoList API"}

@app.get("/tasks", response_model=List[Task])
def get_tasks(current_user: User = Depends(get_current_active_user)):
    """Get all tasks for the current user"""
    user_tasks = tasks_db.get(current_user.id, [])
    return user_tasks

@app.post("/tasks", response_model=Task)
def create_task(
    task: TaskCreate, 
    current_user: User = Depends(get_current_active_user)
):
    """Create a new task for the current user"""
    if current_user.id not in tasks_db:
        tasks_db[current_user.id] = []
    
    task_id = len(tasks_db[current_user.id]) + 1
    new_task = Task(
        id=task_id,
        user_id=current_user.id,
        title=task.title,
        description=task.description,
        completed=task.completed
    )
    tasks_db[current_user.id].append(new_task)
    return new_task

@app.put("/tasks/{task_id}", response_model=Task)
def update_task(
    task_id: int,
    task_update: TaskUpdate,
    current_user: User = Depends(get_current_active_user)
):
    """Update a specific task"""
    if current_user.id not in tasks_db:
        raise HTTPException(status_code=404, detail="No tasks found")
    
    user_tasks = tasks_db[current_user.id]
    if task_id > len(user_tasks) or task_id < 1:
        raise HTTPException(status_code=404, detail="Task not found")
    
    task = user_tasks[task_id - 1]
    
    if task_update.title is not None:
        task.title = task_update.title
    if task_update.description is not None:
        task.description = task_update.description
    if task_update.completed is not None:
        task.completed = task_update.completed
    
    return task

@app.delete("/tasks/{task_id}")
def delete_task(
    task_id: int,
    current_user: User = Depends(get_current_active_user)
):
    """Delete a specific task"""
    if current_user.id not in tasks_db:
        raise HTTPException(status_code=404, detail="No tasks found")
    
    user_tasks = tasks_db[current_user.id]
    if task_id > len(user_tasks) or task_id < 1:
        raise HTTPException(status_code=404, detail="Task not found")
    
    deleted_task = user_tasks.pop(task_id - 1)
    return {"message": f"Task '{deleted_task.title}' deleted successfully"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
