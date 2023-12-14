from typing import Any
from fastapi import APIRouter, Depends

from db.delete import delete
from db.update import update
from db.retrieve import retrieve
from db.insert import insert

from modules.rating.model import RatingModel, CreateRating, UpdateRating
from modules.user.auth import get_current_user


router = APIRouter(prefix="/ratings", tags=['ratings'])

@router.get("/{rating_id}")
def get_rating(
    rating_id: int
):
    success, _, message, items = retrieve(
        tables=[RatingModel],
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
    post_id: int | None = None,
    collector_id: int | None = None
):
    success, count, message, items = retrieve(
        tables=[RatingModel],
        single=False,
        score=score,
        gt__score=gt__score,
        lt__score=lt__score,
        search__comment=search__comment,
        post_id=post_id,
        collector_id=collector_id
    )

    return {"data": items, "success": success, "message": message, "count": count}


@router.post("/")
def create_new_rating(request_data: CreateRating, user: dict[str, Any] = Depends(get_current_user)):
    success, message, data = insert(RatingModel(
        score=request_data.score,
        comment=request_data.comment,
        post_id=request_data.post_id,
        collector_id=user['collector_id']
    ))
    return {"message": message, "success": success, "data": data}


@router.delete("/{rating_id}")
def delete_ratings(rating_id: int, user: dict[str, Any] = Depends(get_current_user)):
    success, message = delete(
        table=RatingModel.get_table_name(),
        rating_id=rating_id,
        collector_id=user['collector_id']
    )
    return {"message": message, "success": success}


@router.put("/{rating_id}")
def update_ratings(rating_id: int, request_data: UpdateRating, user: dict[str, Any] = Depends(get_current_user)):
    success, message, data = update(
        table=RatingModel.get_table_name(),
        model={
            'comment': request_data.comment,
            'score': request_data.score
        },
        identifier=RatingModel.get_identifier(),
        rating_id=rating_id,
        collector_id=user['collector_id']
    )
    return {"message": message, "success": success, "data": data}