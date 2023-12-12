from fastapi import APIRouter

from db.tables import Tables
from db.delete import delete
from db.update import update
from db.retrieve import retrieve
from db.insert import insert

from modules.user.model import UserModel


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
    username: str | None = None,
    first_name: str | None = None,
    last_name: str | None = None,
    email: str | None = None,
    search__username: str | None = None,
    search__first_name: str | None = None,
    search__last_name: str | None = None,
    search__email: str | None = None,
    created_at: str | None = None
):
    success, count, message, items = retrieve(
        table=Tables.User.value,
        single=False,
        username=username,
        first_name=first_name,
        last_name=last_name,
        email=email,
        created_at=created_at,
        search__first_name=search__first_name,
        search__email=search__email,
        search__last_name=search__last_name,
        search__username=search__username
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