from pydantic import BaseModel
from typing import List, Optional
from datetime import date


class UserBase(BaseModel):
    name: str
    email: str
    role: str
    linkedin_url: Optional[str] = None
    profile_info: Optional[str] = None

class UserCreate(UserBase):
    pass

class User(UserBase):
    user_id: int
    projects: Optional[List['Project']] = None  # Relationship with projects
    tasks: Optional[List['Task']] = None        # Relationship with tasks
    user_skills: Optional[List['UserSkill']] = None  # Relationship with user_skills

    class Config:
        orm_mode = True

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    role: Optional[str] = None
    linkedin_url: Optional[str] = None
    profile_info: Optional[str] = None

# Project schema
class ProjectBase(BaseModel):
    project_name: str
    description: Optional[str] = None
    start_date: date
    end_date: date
    github_link: Optional[str] = None  # Replacing document with GitHub link
   

class ProjectCreate(ProjectBase):
    creator_id: int  # The user creating the project

class Project(ProjectBase):
    project_id: int
    tasks: Optional[List['Task']] = None  # Relationship with tasks

    class Config:
        orm_mode = True

class ProjectUpdate(BaseModel):
    project_name: Optional[str] = None
    description: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    github_link: Optional[str] = None 

class ProjectResponse(ProjectBase):
    project_id: int
    tasks: Optional[List['Task']] = None

# Task schema
class TaskBase(BaseModel):
    task_name: str
    deadline: date
    status: str
    points_awarded: Optional[int] = None

class TaskCreate(TaskBase):
    project_id: int
    assigned_to: int  # The user assigned to the task

class Task(TaskBase):
    task_id: int

    class Config:
        orm_mode = True

class TaskUpdate(BaseModel):
    task_name: Optional[str] = None
    project_id: Optional[int] = None  # Can be None if not updating
    assigned_to: Optional[int] = None  # Can be None if not updating
    deadline: Optional[date] = None
    status: Optional[str] = None  # Could be 'To-Do', 'In Progress', 'Done'
    points_awarded: Optional[int] = None


# Skill schema
class SkillBase(BaseModel):
    skill_name: str
    skill_description: Optional[str] = None

class SkillCreate(SkillBase):
    pass

class Skill(SkillBase):
    skill_id: int

    class Config:
        orm_mode = True

class SkillUpdate(BaseModel):
    skill_name: Optional[str] = None
    skill_description: Optional[str] = None

# UserSkill schema
class UserSkillBase(BaseModel):
    skill_level: int

class UserSkillCreate(UserSkillBase):
    user_id: int
    skill_id: int

class UserSkill(UserSkillBase):
    user_id: int
    skill_id: int

    class Config:
        orm_mode = True

