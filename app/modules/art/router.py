from fastapi import APIRouter

from db.delete import delete
from db.update import update
from db.retrieve import retrieve
from db.insert import insert

from modules.art.model import ArtModel


router = APIRouter(prefix="/arts", tags=['arts'])

@router.get("/{art_id}")
def get_art(
    art_id: int
):
    success, _, message, items = retrieve(
        table=ArtModel.get_table_name(),
        single=True,
        art_id=art_id
    )

    return {"data": items[0], "success": success, "message": message}

@router.get("/")
def get_arts(
    content: str | None = None,
    initial_price: str | None = None,
    collection_id: int | None = None,
    artist_id: int | None = None,
    created_at: str | None = None,
):
    success, count, message, items = retrieve(
        table=ArtModel.get_table_name(),
        single=False,
        conent=content,
        initial_price=initial_price,
        collection_id=collection_id,
        artist_id=artist_id,
        created_at=created_at
    )

    return {"data": items, "success": success, "message": message, "count": count}


@router.post("/")
def create_new_art(request_data: ArtModel):
    success, message = insert(request_data)
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