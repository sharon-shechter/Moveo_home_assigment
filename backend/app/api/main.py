from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.tomdb_file import get_db
from app.schemas.codebloc_schema import CodeBlockCreate, CodeBlockResponse
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

@app.get("/codeblocks/{codeblock_id}", response_model=CodeBlockResponse)
def read_codeblock(codeblock_id: int, db: Session = Depends(get_db)):
    cb = get_codeblock_by_id(db, codeblock_id)
    if cb is None:
        raise HTTPException(status_code=404, detail="Code block not found")
    return cb

@app.post("/codeblocks", response_model=CodeBlockResponse)
def create_new_codeblock(codeblock: CodeBlockCreate, db: Session = Depends(get_db)):
    return create_codeblock(db, codeblock)
