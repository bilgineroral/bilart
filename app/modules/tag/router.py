from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from modules.user.auth import get_current_user

from db.delete import delete
from db.update import update
from db.retrieve import retrieve
from db.insert import insert

from modules.tag.model import TagModel


router = APIRouter(prefix="/tags", tags=['tags'])


@router.get("/{name}")
def get_tag(
    tag_name: str
):
    success, _, message, items = retrieve(
        tables=[TagModel],
        single=True,
        tag_name=tag_name
    )

    return {"data": items[0], "success": success, "message": message}


@router.get("/")
def get_tags(
    search__tag_name: str | None = None,
):
    success, count, message, items = retrieve(
        tables=[TagModel],
        single=False,
        search__tag_name=search__tag_name
    )

    return {"data": items, "success": success, "message": message, "count": count}


@router.post("/")
def create_new_tag(request_data: TagModel,
                   user: dict[str, Any] = Depends(get_current_user)):
    if user['privileges'] == 'N':
        raise HTTPException(status_code=401, detail="Not authorized")
    success, message, data = insert(request_data)
    return {"message": message, "success": success, "data": data}


@router.delete("/{name}")
def delete_tags(name: str,
                user: dict[str, Any] = Depends(get_current_user)):
    if user['privileges'] == 'N':
        raise HTTPException(status_code=401, detail="Not authorized")
    success, message = delete(
        table=TagModel.get_table_name(),
        tag_name=name
    )
    return {"message": message, "success": success}


