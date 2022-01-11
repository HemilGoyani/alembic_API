from typing import Optional
from fastapi import FastAPI, HTTPException
from fastapi.param_functions import Depends
from sqlalchemy.orm.session import Session
from databse import Base, engine,get_db
from schemas import GetUserSchemas,UserSchemas
import model

Base.metadata.create_all(bind=engine)
app = FastAPI()


@app.post("/users", response_model=GetUserSchemas)
async def index(user: UserSchemas, db: Session = Depends(get_db)):
    u = model.User(email=user.email, is_active=user.is_active)
    db.add(u)
    db.commit()
    return u


@app.get("/users/{user_id}", response_model=GetUserSchemas)
async def index(user_id: int,db: Session = Depends(get_db)):
    user = db.query(model.User).filter(model.User.id == user_id)
    users = user.first()
    if not users:
        raise HTTPException(status_code=404, detail="id not found")
    db.commit()
    return users


@app.put("/users/{user_id}", response_model=GetUserSchemas)
async def update_user(user_id: int, data: UserSchemas, db: Session = Depends(get_db)):
    user = db.query(model.User).filter(model.User.id == user_id)
    users = user.first()
    if not users:
        raise HTTPException(status_code=404, detail="id not found")
    user.update({"email": data.email, "is_active": data.is_active})
    db.commit()
    return users


@app.delete("/users/{user_id}")
async def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(model.User).filter(model.User.id == user_id)
    if not user.first():
        raise HTTPException(status_code=404, detail="id not found")
    user.delete(synchronize_session=False)
    db.commit()
    return "record are deleted"
