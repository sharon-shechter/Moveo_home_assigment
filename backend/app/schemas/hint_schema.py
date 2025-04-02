from pydantic import BaseModel

class HintRequest(BaseModel):
    student_code: str
    solution_code: str