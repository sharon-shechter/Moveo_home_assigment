from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.codeblock_db import get_db
from app.schemas.codebloc_schema import CodeBlockCreate, CodeBlockResponse
from app. api.chatAPI import get_hint_from_openai
from app.schemas.hint_schema import HintRequest
from app.repositories.codeblock_repo import (
    get_all_codeblocks,
    get_codeblock_by_id,
    create_codeblock
)

app = FastAPI()

@app.get("/")
def read_root():
    return {"welcome": "to the codeblock API"}

@app.get("/codeblocks", response_model=list[CodeBlockResponse])
def read_codeblocks(db: Session = Depends(get_db)):
    return get_all_codeblocks(db)

@app.get("/codeblock_by_id/{codeblock_id}", response_model=CodeBlockResponse)
def read_codeblock(codeblock_id: int, db: Session = Depends(get_db)):
    cb = get_codeblock_by_id(db, codeblock_id)
    if cb is None:
        raise HTTPException(status_code=404, detail="Code block not found")
    return cb

@app.post("/create_codeblock", response_model=CodeBlockResponse)
def create_new_codeblock(codeblock: CodeBlockCreate, db: Session = Depends(get_db)):
    try:
        return create_codeblock(db, codeblock)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@app.post("/get_hint")
def get_hint(data: HintRequest):
    try:
        hint = get_hint_from_openai(data.student_code, data.solution_code)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return {"hint": hint}
