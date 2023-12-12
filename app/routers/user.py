from fastapi import APIRouter

from util.tables import Tables
from util.delete import delete
from util.update import update
from util.retrieve import retrieve
from util.insert import insert

from models import UserModel


router = APIRouter(prefix="/users", tags=['users'])

@router.get("/{user_id}")
def get_user_id(
    user_id: int,
):
    success, _, message, items = retrieve(
        table=Tables.User.value,
        single=True,
        user_id=user_id,
    )

    return {"data": items[0], "success": success, "message": message}


@router.get("/{username}")
def get_user_username(
    username: str,
):
    success, _, message, items = retrieve(
        table=Tables.User.value,
        single=True,
        username=username,
    )

    return {"data": items[0], "success": success, "message": message}

@router.get("/")
def get_users(
    user_id: int | None = None,
    username: str | None = None,
    first_name: str | None = None,
    last_name: str | None = None,
    email: str | None = None,
    created_at: str | None = None
):
    success, count, message, items = retrieve(
        table=Tables.User.value,
        single=False,
        user_id=user_id,
        username=username,
        first_name=first_name,
        last_name=last_name,
        email=email,
        created_at=created_at
    )

    return {"data": items, "success": success, "message": message, "count": count}


@router.post("/")
def create_new_user(request_data: UserModel):
    success, message = insert(request_data)
    return {"message": message, "success": success}


@router.delete("/{user_id}")
def delete_user(user_id: int):
    success, message = delete(
        table=Tables.User.value,
        user_id=user_id
    )
    return {"message": message, "success": success}


@router.put("/{user_id}")
def update_user(user_id: int, request_data: UserModel):
    success, message = update(
        table=Tables.User.value,
        model=request_data,
        user_id=user_id
    )
    return {"message": message, "success": success}