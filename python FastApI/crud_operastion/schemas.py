from typing import Optional
from pydantic import BaseModel


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
        
class Parent(BaseModel):
    name: str
    address: str
    mobileno: int
    
    class Config:
        orm_mode = True

class Getparent(BaseModel):
    id: int
    name: str
    address: str
    mobileno: int
    
    class Config:
        orm_mode = True
class Childreq(BaseModel):
    address: str
    parent_id: int
    
    class Config:
        orm_mode = True
        
class GetChild(BaseModel):
    id: int
    parent_id: int
    address: str    
    
    class Config:
        orm_mode = True        
