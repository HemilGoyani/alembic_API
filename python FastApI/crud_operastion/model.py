
from sqlalchemy import Column, String, Integer, Boolean
from databse import Base

class User(Base):
    __tablename__ = "Users1"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    is_active = Column(Boolean, default=True)