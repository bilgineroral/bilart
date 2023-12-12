from fastapi import APIRouter

from db.tables import Tables
from db.delete import delete
from db.update import update
from db.retrieve import retrieve
from db.insert import insert

from modules.rating.model import RatingModel


router = APIRouter(prefix="/ratings", tags=['ratings'])

@router.get("/{rating_id}")
def get_rating(
    rating_id: int
):
    success, _, message, items = retrieve(
        table=Tables.Collector.value,
        single=True,
        rating_id=rating_id
    )

    return {"data": items[0], "success": success, "message": message}

@router.get("/")
def get_ratings(
    score: int | None = None,
    gt__score: int | None = None,
    lt__score: int | None = None,
    search__comment: str | None = None,
    art_id: int | None = None,
    collector_id: int | None = None
):
    success, count, message, items = retrieve(
        table=Tables.Rating.value,
        single=False,
        score=score,
        gt__score=gt__score,
        lt__score=lt__score,
        search__comment=search__comment,
        art_id=art_id,
        collector_id=collector_id
    )

    return {"data": items, "success": success, "message": message, "count": count}


@router.post("/")
def create_new_rating(request_data: RatingModel):
    success, message = insert(request_data)
    return {"message": message, "success": success}


@router.delete("/{rating_id}")
def delete_ratings(rating_id: int):
    success, message = delete(
        table=Tables.Rating.value,
        rating_id=rating_id
    )
    return {"message": message, "success": success}


@router.put("/{rating_id}")
def update_ratings(rating_id: int, request_data: RatingModel):
    success, message = update(
        table=Tables.Rating.value,
        model=request_data,
        rating_id=rating_id
    )
    return {"message": message, "success": success}