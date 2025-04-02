from pydantic import BaseModel
from typing import Optional

class CodeBlockBase(BaseModel):
    title: str
    initial_template: str
    solution_code: str

CodeBlockCreate = CodeBlockBase

class CodeBlockResponse(CodeBlockBase):
    id: int

    class Config:
        orm_mode = True
