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
