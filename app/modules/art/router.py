from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from modules.collection.model import CollectionModel
from modules.tag__post.model import TagPostModel
from modules.art__collection.model import ArtCollectionModel
from  modules.favorite.model import FavoriteModel

from db.delete import delete
from db.update import update
from db.retrieve import retrieve
from db.insert import insert
from fastapi import File, Form, UploadFile
from modules.art.model import ArtModel, UpdateArt, UpdateArt
from modules.post.model import PostModel
from modules.user.auth import get_current_user
import os
import dotenv
from pathlib import Path
from file_manager import FileManager


BASE_DIR = Path(__file__).resolve().parent.parent
dotenv.load_dotenv(BASE_DIR / ".env")

FILEPATH = os.getenv("FILEPATH")



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
    collector_id: int | None = None,
    tag_name: str | None = None,
    collection: int | None = None,
    favoriting_collector: int | None = None
):
    filters = {
        "tables": [
            ArtModel, 
            PostModel, 
            TagPostModel if tag_name else None,
            ArtCollectionModel if collection else None,
            FavoriteModel if favoriting_collector else None
        ],
        "single": False,
        f"table__{ArtModel.get_table_name()}__content": content,
        f"table__{ArtModel.get_table_name()}__collector_id": collector_id,
        f"table__{PostModel.get_table_name()}__created_at": created_at,
        f"table__{PostModel.get_table_name()}__artist_id": artist_id,
        f"table__{PostModel.get_table_name()}__title": title,
        f"table__{PostModel.get_table_name()}__search__title": search__title,
        f"table__{PostModel.get_table_name()}__description": description,
        f"table__{PostModel.get_table_name()}__search__description": search__description,
        f"table__{TagPostModel.get_table_name()}__tag_name": tag_name,
        f"table__{FavoriteModel.get_table_name()}__collector_id": favoriting_collector,
    }

    success, count, message, items = retrieve(**filters)

    return {"data": items, "success": success, "message": message, "count": count}


@router.post("/")
async def create_new_art( title: str = Form(...),
                    description: str = Form(...),
                    price: float = Form(...),
                    image: UploadFile = File(...),
                    user: dict[str, Any] = Depends(get_current_user)):
    
    success, message, post = insert(
        PostModel(
            artist_id=user['artist_id'], 
            description=description, 
            title=title
        )
    )

    file_mgr = FileManager(f"{FILEPATH}post_images/")
    content = await file_mgr.save(image)
    
    if content is None:
        raise HTTPException(status_code=500, detail="Image upload failed")

    success, message, art = insert(
        ArtModel(
            price=price,
            content=content,
            post_id=post['post_id']
        )
    )
    
    return {"message": message, "success": success, "data": dict(post, **art)}


@router.delete("/{art_id}")
def delete_art(art_id: int, user: dict[str, Any] = Depends(get_current_user)):
    success, message = delete(
        table=ArtModel.get_table_name(),
        art_id=art_id,
        artist_id=user['artist_id']
    )
    return {"message": message, "success": success}


@router.put("/{art_id}")
def update_art(art_id: int, request_data: UpdateArt, user: dict[str, Any] = Depends(get_current_user)):
    _, _, _, art = retrieve(
        tables=[ArtModel],
        single=True,
        art_id=art_id
    )
    
    art = art[0]
    
    success, message, post = update(
        table=PostModel.get_table_name(),
        model={
            'title': request_data.title,
            'description': request_data.description
        },
        identifier=PostModel.get_identifier(),
        post_id=art['post_id'],
        artist_id=user['artist_id']
    )
    
    return {"message": message, "success": success, "data": dict(post, **art)}
