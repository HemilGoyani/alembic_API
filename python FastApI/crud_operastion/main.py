from typing import List, Optional
from fastapi import FastAPI, HTTPException
from fastapi.param_functions import Depends
from pydantic import BaseModel, EmailStr
from sqlalchemy import Column, String, Integer, Boolean
from sqlalchemy.orm.session import Session
from sqlalchemy.sql.functions import user
from databse import Base, engine, SessionLocal

# models


class User(Base):
    __tablename__ = "Users1"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    is_active = Column(Boolean, default=True)

# schemas


class UserSchemas(BaseModel):
    email: str
    is_active: bool

    class Config:
        orm_mode = True


class GetUserSchemas(BaseModel):
    id: Optional[int]
    email: Optional[str]
    is_active: Optional[bool]

    class Config:
        orm_mode = True


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


Base.metadata.create_all(bind=engine)
app = FastAPI()


@app.post("/users", response_model=GetUserSchemas)
async def index(user: UserSchemas, db: Session = Depends(get_db)):
    u = User(email=user.email, is_active=user.is_active)
    db.add(u)
    db.commit()
    return u


@app.get("/users/{user_id}", response_model=GetUserSchemas)
async def index(user_id: int,db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id)
    users = user.first()
    if not users:
        raise HTTPException(status_code=404, detail="id not found")
    db.commit()
    return users


@app.put("/users/{user_id}", response_model=GetUserSchemas)
async def update_user(user_id: int, data: UserSchemas, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id)
    users = user.first()
    if not users:
        raise HTTPException(status_code=404, detail="id not found")
    user.update({"email": data.email, "is_active": data.is_active})
    db.commit()
    return users


@app.delete("/users/{user_id}")
async def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id)
    if not user.first():
        raise HTTPException(status_code=404, detail="id not found")
    user.delete(synchronize_session=False)
    db.commit()
    return "record are deleted"
