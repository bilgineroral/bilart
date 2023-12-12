from fastapi import APIRouter

from util.tables import Tables
from util.delete import delete
from util.update import update
from util.retrieve import retrieve
from util.insert import insert

from models import ArtistModel


router = APIRouter(prefix="/artists", tags=['artists'])

@router.get("/{artist_id}")
def get_artist(
    artist_id: int
):
    success, _, message, items = retrieve(
        table=Tables.Collector.value,
        single=True,
        artist_id=artist_id
    )

    return {"data": items[0], "success": success, "message": message}

@router.get("/")
def get_artists(
    link: str | None = None,
    search__bio: str | None = None,
):
    success, count, message, items = retrieve(
        table=Tables.Artist.value,
        single=False,
        link=link,
        search__bio=search__bio
    )

    return {"data": items, "success": success, "message": message, "count": count}


@router.post("/")
def create_new_artist(request_data: ArtistModel):
    success, message = insert(request_data)
    return {"message": message, "success": success}


@router.delete("/{artist_id}")
def delete_artists(artist_id: int):
    success, message = delete(
        table=Tables.Artist.value,
        artist_id=artist_id
    )
    return {"message": message, "success": success}


@router.put("/{artist_id}")
def update_artists(artist_id: int, request_data: ArtistModel):
    success, message = update(
        table=Tables.Artist.value,
        model=request_data,
        artist_id=artist_id
    )
    return {"message": message, "success": success}