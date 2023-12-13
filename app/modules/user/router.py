from typing import Annotated, Any
from fastapi import APIRouter, Depends

from db.delete import delete
from db.update import update
from db.retrieve import retrieve
from db.insert import insert

from modules.user.model import UserModel
from modules.user.auth import get_current_user


router = APIRouter(prefix="/users", tags=['users'])


@router.get("/me")
def get_me(
    user: dict[str, Any] = Depends(get_current_user)
):
    return user

@router.delete("/me")
def delete_user(user: dict[str, Any] = Depends(get_current_user)):
    success, message = delete(
        table=UserModel.get_table_name(),
        user_id=user['user_id']
    )
    return {"message": message, "success": success}


@router.put("/me")
def update_user(request_data: UserModel, user: dict[str, Any] = Depends(get_current_user)):
    success, message = update(
        table=UserModel.get_table_name(),
        model=request_data,
        user_id=user['user_id']
    )
    return {"message": message, "success": success}

@router.get("/{user_id}")
def get_user_id(
    user_id: int,
):
    success, _, message, items = retrieve(
        tables=[UserModel],
        single=True,
        user_id=user_id,
    )

    return {"data": items[0], "success": success, "message": message}


@router.get("/{username}")
def get_user_username(
    username: str,
):
    success, _, message, items = retrieve(
        tables=[UserModel],
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
        tables=[UserModel],
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


@router.post("/register")
def create_new_user(request_data: UserModel):
    success, message, data = insert(request_data)
    return {"message": message, "success": success, "data": data}

