# main.py
from fastapi import FastAPI, Depends, Form, HTTPException,File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import models, database
from crud import *
from schemas import * 
from datetime import datetime

app = FastAPI()

origins = [
    "http://localhost:3000",  # React frontend running locally on port 3000
    # Add your production URL here once deployed
    # "https://yourfrontendurl.com",  # Production URL
]

# Add CORS middleware to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow requests from these origins
    allow_credentials=True,  # Allow credentials like cookies or Authorization headers
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers (e.g., Content-Type, Authorization)
)
# Test route to check the DB connection
@app.get("/test-db")
def test_db(db: Session = Depends(database.get_db)):
    # Query all users
    data = db.query(models.users).all()
    return data

# Create new user route
@app.post("/users/", response_model=User)
def create_new_user(user: UserCreate, db: Session = Depends(database.get_db)):
    db_user = create_user(db=db, user=user)
    if db_user:
        return db_user
    else:
        raise HTTPException(status_code=400, detail="User creation failed")

# Delete all users route
@app.delete("/users/delete-all/", status_code=200)
def delete_all_users_route(db: Session = Depends(database.get_db)):  # Changed the function name to avoid conflict
    success = delete_all_users(db)  # Now calling the function from crud.py
    if success:
        return {"message": "All users deleted successfully"}
    else:
        raise HTTPException(status_code=500, detail="Failed to delete all users")


@app.get("/users/get/{user_id}", response_model=User)
def get_user(user_id: int, db: Session = Depends(database.get_db)):
    print(f"Received user_id: {user_id}")  # Log the user ID for debugging
    user = db.query(users).filter(users.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
    
@app.put("/users/update/{user_id}", response_model=User, status_code=200)
def update_user_route(user_id: int, user_update:UserUpdate, db: Session = Depends(database.get_db)):
    updated_user = update_user_by_id(db, user_id, user_update)
    if updated_user:
        return updated_user
    else:
        raise HTTPException(status_code=404, detail="User not found")
    
# Project

@app.get("/projects/get/{project_id}", response_model=Project)
def get_project_route(project_id: int, db: Session = Depends(database.get_db)):
    project = get_project_by_id(db, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

# POST endpoint to create a new project with an optional document upload
@app.post("/projects/create/", response_model=ProjectResponse, status_code=201)
async def create_project_route(
    project_data: ProjectCreate,  # Accepting JSON data in the body
    db: Session = Depends(database.get_db)
):
    # Create a new project
    new_project = create_project(db, project_data)
    return new_project


# PUT endpoint to update a project with optional document upload
@app.put("/projects/update/{project_id}", response_model=Project)
async def update_project(
    project_id: int,
    project_update: ProjectUpdate,
    github_link: str = Form(None),  # Replace project_document with github_link
    db: Session = Depends(database.get_db)
):
    project_update_data = project_update.dict(exclude_unset=True)
    if github_link:
        project_update_data['github_link'] = github_link  # Use github_link here
    
    project = update_project_by_id(db, project_id, project_update_data)
    if project:
        return project
    else:
        raise HTTPException(status_code=404, detail="Project not found")


# DELETE endpoint to delete a project by project ID
@app.delete("/projects/delete/{project_id}", status_code=200)
def delete_project(project_id: int, db: Session = Depends(database.get_db)):
    success = delete_project_by_id(db, project_id)
    if success:
        return {"message": "Project deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="Project not found")

# DELETE endpoint to delete a project by user ID and project ID
@app.delete("/users/{user_id}/projects/{project_id}", status_code=200)
def delete_project(user_id: int, project_id: int, db: Session = Depends(database.get_db)):
    success = delete_project_by_user_and_id(db, user_id, project_id)
    if success:
        return {"message": "Project deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="Project not found for the specified user")

#TASKS

@app.post("/tasks/create", response_model=Task, status_code=201)
def create_task_endpoint(task: TaskCreate, db: Session = Depends(database.get_db)):
    db_task = create_task(db, task)
    return db_task

# Get a task by ID
@app.get("/tasks/{task_id}", response_model=Task)
def get_task(task_id: int, db: Session = Depends(database.get_db)):
    db_task = get_task_by_id(db, task_id)
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    return db_task

# Update a task by ID
@app.put("/tasks/update/{task_id}", response_model=Task)
def update_task_endpoint(task_id: int, task_update: TaskUpdate, db: Session = Depends(database.get_db)):
    updated_task = update_task(db, task_id, task_update)
    if not updated_task:
        raise HTTPException(status_code=404, detail="Task not found")
    return updated_task

# Delete a task by ID
@app.delete("/tasks/{task_id}", status_code=200)
def delete_task_endpoint(task_id: int, db: Session = Depends(database.get_db)):
    success = delete_task(db, task_id)
    if not success:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task deleted successfully"}

#SKILLS

@app.post("/skills/create", response_model=Skill, status_code=201)
def create_skill_endpoint(skill: SkillCreate, db: Session = Depends(database.get_db)):
    db_skill = create_skill(db, skill)
    return db_skill

# Get a skill by ID
@app.get("/skills/get/{skill_id}", response_model=Skill)
def get_skill(skill_id: int, db: Session = Depends(database.get_db)):
    db_skill = get_skill_by_id(db, skill_id)
    if not db_skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    return db_skill

# Update a skill by ID
@app.put("/skills/update/{skill_id}", response_model=Skill)
def update_skill_endpoint(skill_id: int, skill_update: SkillUpdate, db: Session = Depends(database.get_db)):
    updated_skill = update_skill(db, skill_id, skill_update)
    if not updated_skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    return updated_skill

# Delete a skill by ID
@app.delete("/skills/delete/{skill_id}", status_code=200)
def delete_skill_endpoint(skill_id: int, db: Session = Depends(database.get_db)):
    success = delete_skill(db, skill_id)
    if not success:
        raise HTTPException(status_code=404, detail="Skill not found")
    return {"message": "Skill deleted successfully"}

#USERS_SKILLS

# Create a user skill
def create_user_skill(db: Session, user_skill: UserSkillCreate):
    db_user_skill = user_skills(
        user_id=user_skill.user_id,
        skill_id=user_skill.skill_id,
        skill_level=user_skill.skill_level
    )
    db.add(db_user_skill)
    db.commit()
    db.refresh(db_user_skill)
    return db_user_skill

# Get a user skill by user_id and skill_id
def get_user_skill_by_id(db: Session, user_id: int, skill_id: int):
    return db.query(user_skills).filter_by(user_id=user_id, skill_id=skill_id).first()

# Update a user skill
def update_user_skill(db: Session, user_id: int, skill_id: int, skill_update: UserSkillBase):
    db_user_skill = get_user_skill_by_id(db, user_id, skill_id)
    if db_user_skill:
        db_user_skill.skill_level = skill_update.skill_level
        db.commit()
        db.refresh(db_user_skill)
    return db_user_skill

# Delete a user skill by user_id and skill_id
def delete_user_skill(db: Session, user_id: int, skill_id: int):
    db_user_skill = get_user_skill_by_id(db, user_id, skill_id)
    if db_user_skill:
        db.delete(db_user_skill)
        db.commit()
        return True
    return False

#SKILL DEVELOPMENT

