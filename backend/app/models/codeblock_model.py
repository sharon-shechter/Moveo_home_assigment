from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class CodeBlock(Base):
    __tablename__ = 'codeblocks'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, unique=True, nullable=False)
    initial_template = Column(Text, nullable=False)
    solution_code = Column(Text, nullable=False)
