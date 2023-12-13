from typing import Any
from fastapi import APIRouter, Depends

from db.delete import delete
from db.update import update
from db.retrieve import retrieve
from db.insert import insert

from modules.art.model import ArtModel, CreateArt
from modules.post.model import PostModel
from modules.user.auth import get_current_user


router = APIRouter(prefix="/arts", tags=['arts'])


@router.get("/{art_id}")
def get_art(
    art_id: int
):
    success, _, message, items = retrieve(
        tables=[ArtModel, PostModel],
        single=True,
        art_id=art_id
    )

    return {"data": items[0], "success": success, "message": message}


@router.get("/")
def get_arts(
    content: str | None = None,
    created_at: str | None = None,
    artist_id: int | None = None,
    title: str | None = None,
    description: str | None = None,
    search__title: str | None = None,
    search__description: str | None = None,
):
    filters = {
        "tables": [ArtModel, PostModel],
        "single": False,
        f"table__{ArtModel.get_table_name()}__content": content,
        f"table__{PostModel.get_table_name()}__created_at": created_at,
        f"table__{PostModel.get_table_name()}__artist_id": artist_id,
        f"table__{PostModel.get_table_name()}__title": title,
        f"table__{PostModel.get_table_name()}__search__title": search__title,
        f"table__{PostModel.get_table_name()}__description": description,
        f"table__{PostModel.get_table_name()}__search__description": search__description,
    }

    success, count, message, items = retrieve(**filters)

    return {"data": items, "success": success, "message": message, "count": count}


@router.post("/")
def create_new_art(request_data: CreateArt, user: dict[str, Any] = Depends(get_current_user)):
    success, message = insert(
        PostModel(
            artist_id=user['user_id'], 
            description=request_data.description, 
            title=request_data.title
        )
    )
    return {"message": message, "success": success}


@router.delete("/{art_id}")
def delete_art(art_id: int):
    success, message = delete(
        table=ArtModel.get_table_name(),
        art_id=art_id
    )
    return {"message": message, "success": success}


@router.put("/{art_id}")
def update_art(art_id: int, request_data: ArtModel):
    success, message = update(
        table=ArtModel.get_table_name(),
        model=request_data,
        art_id=art_id
    )
    return {"message": message, "success": success}
