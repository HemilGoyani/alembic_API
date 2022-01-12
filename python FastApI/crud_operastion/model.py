
from sqlalchemy import Column, String, Integer, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql.schema import ForeignKey
from sqlalchemy.sql.sqltypes import Numeric
from databse import Base

class User(Base):
    __tablename__ = "Users1"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    is_active = Column(Boolean, default=True)
    
class parent(Base):
    __tablename__ = 'parent'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String,  index=True)
    address = Column(String,  index=True)
    mobileno = Column(Integer, index= True)
    children = relationship("Child")

class Child(Base):
    __tablename__ = 'child'
    id = Column(Integer, primary_key=True, index=True)
    parent_id = Column(Integer, ForeignKey('parent.id'))
    address = Column(String)    