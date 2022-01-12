from fastapi import FastAPI, HTTPException
from fastapi.param_functions import Depends
from sqlalchemy.orm.session import Session
from databse import Base, engine,get_db
from schemas import GetUserSchemas,UserSchemas,Parent,Getparent,Childreq,GetChild
from model import User,parent,Child


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

from typing import List
@app.get("/users/", response_model=List[GetUserSchemas])
async def index(db: Session = Depends(get_db)):
    user = db.query(User).all()
    return user


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

@app.post("/parent", response_model=Getparent)
async def index(user: Parent, db: Session = Depends(get_db)):
    u = parent(name= user.name, address= user.address, mobileno= user.mobileno)
    db.add(u)
    print(u)
    db.commit()
    return u

@app.get("/parent", response_model=List[Getparent])
async def index(db: Session = Depends(get_db)):
    user = db.query(parent).all()
    return user

@app.post("/child_data",response_model= GetChild)
async def index(user: Childreq, db: Session = Depends(get_db)):
    u = Child(address= user.address,parent_id= user.parent_id)
    db.add(u)
    db.commit()
    return u

@app.get("/child",response_model= List[GetChild])
async def get_child(user_id: int, db: Session = Depends(get_db)):
    user = db.query(Child).filter(Child.parent_id == user_id)
    users = user.all()
    if not users:
        raise HTTPException(status_code=404, detail="id not found")
    db.commit()
    return users