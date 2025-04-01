from pydantic import BaseModel

class CodeBlockBase(BaseModel):
    title: str
    initial_template: str
    solution_code: str

class CodeBlockCreate(CodeBlockBase):
    pass

class CodeBlockResponse(CodeBlockBase):
    id: int

    class Config:
        orm_mode = True
