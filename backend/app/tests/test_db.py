import pytest
from unittest.mock import MagicMock
from app.schemas.codebloc_schema import CodeBlockCreate
from app.repositories.codeblock_repo import (
    get_all_codeblocks,
    get_codeblock_by_id,
    create_codeblock,
    delete_codeblock
)

def test_get_all_codeblocks():
    db = MagicMock()
    db.query().all.return_value = ["cb1", "cb2"]

    result = get_all_codeblocks(db)

    assert result == ["cb1", "cb2"]

def test_get_codeblock_by_id():
    db = MagicMock()
    db.query().filter().first.return_value = "some_codeblock"

    result = get_codeblock_by_id(db, 1)

    assert result == "some_codeblock"

def test_create_codeblock_ok():
    db = MagicMock()
    db.query().filter().first.return_value = None

    data = CodeBlockCreate(
        title="test",
        initial_template="a = 1",
        solution_code="print(a)"
    )

    result = create_codeblock(db, data)

    db.add.assert_called()
    db.commit.assert_called()
    db.refresh.assert_called()
    assert result is not None

def test_create_codeblock_duplicate():
    db = MagicMock()
    db.query().filter().first.return_value = "already exists"

    data = CodeBlockCreate(
        title="test",
        initial_template="a = 1",
        solution_code="print(a)"
    )

    with pytest.raises(ValueError):
        create_codeblock(db, data)

def test_delete_codeblock_found():
    db = MagicMock()
    codeblock = MagicMock()
    db.query().filter().first.return_value = codeblock

    result = delete_codeblock(db, 1)

    db.delete.assert_called_with(codeblock)
    db.commit.assert_called()
    assert result == codeblock

def test_delete_codeblock_not_found():
    db = MagicMock()
    db.query().filter().first.return_value = None

    result = delete_codeblock(db, 1)

    assert result is None
