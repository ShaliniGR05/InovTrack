import enum
from sqlalchemy import Column, Integer, String, Text, Date, ForeignKey, CheckConstraint, UniqueConstraint, LargeBinary
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from enum import Enum


Base = declarative_base()

# USERS
class users(Base):
    __tablename__ = 'users'
    
    user_id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    role = Column(String(50), CheckConstraint("role IN ('student', 'teacher')"), nullable=False)
    linkedin_url = Column(String(255))
    profile_info = Column(Text)

    # Relationships
    projects = relationship('Projects', backref='creator', lazy=True)
    tasks = relationship('tasks', backref='assigned_user', lazy=True)
    user_skills = relationship('user_skills', backref='user', lazy=True)

    def __repr__(self):
        return f'<User {self.name}>'

class Projects(Base):
    __tablename__ = 'projects'
    
    project_id = Column(Integer, primary_key=True, autoincrement=True)
    project_name = Column(String(255), nullable=False)
    description = Column(Text)
    creator_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    github_link = Column(String(255))  # Replacing document with GitHub link

    # Relationships
    tasks = relationship('tasks', backref='project', lazy=True)

    def __repr__(self):
        return f'<Project {self.project_name}>'

class tasks(Base):
    __tablename__ = 'tasks'
    
    task_id = Column(Integer, primary_key=True, autoincrement=True)
    task_name = Column(String(255), nullable=False)
    project_id = Column(Integer, ForeignKey('projects.project_id'), nullable=False)
    assigned_to = Column(Integer, ForeignKey('users.user_id'), nullable=False)
    deadline = Column(Date, nullable=False)
    status = Column(String(50), CheckConstraint("status IN ('To-Do', 'In Progress', 'Done')"), nullable=False)
    points_awarded = Column(Integer)

    def __repr__(self):
        return f'<Task {self.task_name}>'

class skills(Base):
    __tablename__ = 'skills'
    
    skill_id = Column(Integer, primary_key=True, autoincrement=True)
    skill_name = Column(String(255), nullable=False)
    skill_description = Column(Text)

    # Relationships
    user_skills = relationship('user_skills', backref='skill', lazy=True)

    def __repr__(self):
        return f'<Skill {self.skill_name}>'

class user_skills(Base):
    __tablename__ = 'user_skills'
    
    user_id = Column(Integer, ForeignKey('users.user_id'), primary_key=True)
    skill_id = Column(Integer, ForeignKey('skills.skill_id'), primary_key=True)
    skill_level = Column(Integer, CheckConstraint('skill_level BETWEEN 1 AND 10'), nullable=False)

    def __repr__(self):
        return f'<UserSkill user_id={self.user_id} skill_id={self.skill_id}>'

# Skill Development
'''class ActivityTypeEnum(enum.Enum):
    workshop = "workshop"
    seminar = "seminar"
    paper_presentation = "paper_presentation"
    project_presentation = "project_presentation"
    hackathon = "hackathon"
    certification = "certification"
    inplant = "inplant"
    internship = "internship"
    others = "others"

class SkillD(Base):
    __tablename__ = "skill_development"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False)
    activity_type = Column(Enum(ActivityTypeEnum), nullable=False)
    title = Column(String, nullable=True)
    file_data = Column(LargeBinary, nullable=True)

    user = relationship("users", back_populates="skill_developments")
'''