from sqlalchemy.orm import Session
from app.models.codeblock_model import CodeBlock
from app.schemas.codebloc_schema import CodeBlockCreate


def get_all_codeblocks(db: Session):
    return db.query(CodeBlock).all()

def get_codeblock_by_id(db: Session, codeblock_id: int):
    return db.query(CodeBlock).filter(CodeBlock.id == codeblock_id).first()

def create_codeblock(db: Session, codeblock_data: CodeBlockCreate):
    existing = db.query(CodeBlock).filter(CodeBlock.title == codeblock_data.title).first()
    if existing:
        raise ValueError("A code block with this title already exists.")

    db_codeblock = CodeBlock(
        title=codeblock_data.title,
        initial_template=codeblock_data.initial_template,
        solution_code=codeblock_data.solution_code
    )
    db.add(db_codeblock)
    db.commit()
    db.refresh(db_codeblock)
    return db_codeblock

def delete_codeblock(db: Session, codeblock_id: int):
    codeblock = db.query(CodeBlock).filter(CodeBlock.id == codeblock_id).first()
    if codeblock:
        db.delete(codeblock)
        db.commit()
    return codeblock
