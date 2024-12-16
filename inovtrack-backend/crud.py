from sqlalchemy.orm import Session
from models import * # Import the SQLAlchemy user model
from schemas import *

#USERS
def create_user(db: Session, user: UserCreate):
    db_user = users(
        name=user.name,
        email=user.email,
        profile_info=user.profile_info,
        linkedin_url=user.linkedin_url,
        role='student'  # Default role or you can dynamically set it
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# Get a user by ID
def get_user(db: Session, user_id: int) -> users:
    return db.query(users).filter(users.user_id == user_id).first()

# Update an existing user
def update_user(db: Session, user_id: int, user: UserCreate) -> users:
    db_user = db.query(users).filter(users.user_id == user_id).first()
    if db_user:
        db_user.name = user.name
        db_user.email = user.email
        db_user.role = user.role
        db_user.linkedin_url = user.linkedin_url
        db_user.profile_info = user.profile_info
        db.commit()
        db.refresh(db_user)
        return db_user
    return None  # Return None if user not found

# Delete a user by ID
def delete_user(db: Session, user_id: int) -> bool:
    db_user = db.query(users).filter(users.user_id == user_id).first()
    if db_user:
        db.delete(db_user)
        db.commit()
        return True
    return False  # Return False if user not found

def delete_all_users(db: Session):
    try:
        # Delete all users from the users table
        db.query(users).delete()
        db.commit()  # Commit the changes to the database
        return True
    except Exception as e:
        db.rollback()  # In case of error, roll back the transaction
        return False

def update_user_by_id(db: Session, user_id: int, user_update: UserUpdate):
    user = db.query(users).filter(users.user_id == user_id).first()
    if user:
        # Update fields if they are provided in the update data
        update_data = user_update.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(user, key, value)
        db.commit()
        db.refresh(user)  # Refresh the instance with updated data
        return user
    return None


def get_user_by_id(user_id: int, db: Session):
    user = db.query(users).filter(users.user_id == user_id).first()
    return user
#PROJECTS

def get_project_by_id(db: Session, project_id: int):
    return db.query(Projects).filter(Projects.project_id == project_id).first()

def create_project(db: Session, project_data: ProjectCreate):
    new_project = Projects(
        project_name=project_data.project_name,
        description=project_data.description,
        creator_id=project_data.creator_id,
        start_date=project_data.start_date,
        end_date=project_data.end_date,
        github_link=project_data.github_link  # Use github_link here
    )
    db.add(new_project)
    db.commit()
    db.refresh(new_project)
    return new_project


def update_project_by_id(db: Session, project_id: int, project_update: ProjectUpdate):
    project = db.query(Projects).filter(Projects.project_id == project_id).first()
    if project:
        update_data = project_update.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(project, key, value)
        db.commit()
        db.refresh(project)
        return project
    return None

def delete_project_by_id(db: Session, project_id: int):
    project = db.query(Projects).filter(Projects.project_id == project_id).first()
    if project:
        db.delete(project)
        db.commit()
        return True
    return False

def delete_project_by_user_and_id(db: Session, user_id: int, project_id: int):
    project = (
        db.query(Projects)
        .filter(Projects.creator_id == user_id, Projects.project_id == project_id)
        .first()
    )
    if project:
        db.delete(project)
        db.commit()
        return True
    return False

#Tasks

def create_task(db: Session, task: TaskCreate):
    db_task = tasks(
        task_name=task.task_name,
        project_id=task.project_id,
        assigned_to=task.assigned_to,
        deadline=task.deadline,
        status=task.status,
        points_awarded=task.points_awarded
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

# Get a task by ID
def get_task_by_id(db: Session, task_id: int):
    return db.query(tasks).filter(tasks.task_id == task_id).first()

# Update a task by ID
def update_task(db: Session, task_id: int, task_update: TaskUpdate):
    db_task = db.query(tasks).filter(tasks.task_id == task_id).first()
    if db_task:
        update_data = task_update.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_task, key, value)
        db.commit()
        db.refresh(db_task)
        return db_task
    return None

# Delete a task by ID
def delete_task(db: Session, task_id: int):
    db_task = db.query(tasks).filter(tasks.task_id == task_id).first()
    if db_task:
        db.delete(db_task)
        db.commit()
        return True
    return False

#SKILLS
def create_skill(db: Session, skill: SkillCreate):
    db_skill = skills(
        skill_name=skill.skill_name,
        skill_description=skill.skill_description
    )
    db.add(db_skill)
    db.commit()
    db.refresh(db_skill)
    return db_skill

# Get a skill by ID
def get_skill_by_id(db: Session, skill_id: int):
    return db.query(skills).filter(skills.skill_id == skill_id).first()

# Update a skill by ID
def update_skill(db: Session, skill_id: int, skill_update: SkillUpdate):
    db_skill = db.query(skills).filter(skills.skill_id == skill_id).first()
    if db_skill:
        update_data = skill_update.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_skill, key, value)
        db.commit()
        db.refresh(db_skill)
        return db_skill
    return None

# Delete a skill by ID
def delete_skill(db: Session, skill_id: int):
    db_skill = db.query(skills).filter(skills.skill_id == skill_id).first()
    if db_skill:
        db.delete(db_skill)
        db.commit()
        return True
    return False

#USER_SKILLS

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

