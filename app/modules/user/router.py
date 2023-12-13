from typing import Any
from fastapi import APIRouter, Depends

from db.delete import delete
from db.update import update
from db.retrieve import retrieve
from db.insert import insert

from modules.user.model import UserModel, UpdateUser
from modules.user.auth import get_current_user
from modules.admin.model import AdminModel
from modules.collector.model import CollectorModel
from modules.artist.model import ArtistModel


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
def update_user(request_data: UpdateUser, user: dict[str, Any] = Depends(get_current_user)):
    success, message, updated_user = update(
        table=UserModel.get_table_name(),
        model={
            'username': request_data.username,
            'first_name': request_data.first_name,
            'last_name': request_data.last_name,
            'email': request_data.email,
            'phone': request_data.phone,
            'password_hash': request_data.password
        },
        identifier= UserModel.get_identifier(),
        user_id=user['user_id']
    )
    
    success, message, artist = update(
        table=ArtistModel.get_table_name(),
        model={
            'bio': request_data.bio,
            'link': request_data.link
        },
        identifier=ArtistModel.get_identifier(),
        user_id=user['artist_id']
    )
    
    success, message, admin = update(
        table=AdminModel.get_table_name(),
        model={
            'privledge': request_data.privledge
        },
        identifier=AdminModel.get_identifier(),
        user_id=user['admin_id']
    )
    return {"message": message, "success": success, "data": dict(updated_user, **artist, **admin)}

@router.get("/{user_id}")
def get_user_id(
    user_id: int,
):
    success, _, message, items = retrieve(
        tables=[UserModel, CollectorModel, ArtistModel, AdminModel],
        single=True,
        user_id=user_id,
    )

    return {"data": items[0], "success": success, "message": message}


@router.get("/{username}")
def get_user_username(
    username: str,
):
    success, _, message, items = retrieve(
        tables=[UserModel, CollectorModel, ArtistModel, AdminModel],
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
    bio: str | None = None,
    link: str | None = None,
    privledge: str | None = None,
    rank: int | None = None,
    search__username: str | None = None,
    search__first_name: str | None = None,
    search__last_name: str | None = None,
    search__email: str | None = None,
    search__bio: str | None = None,
    created_at: str | None = None
):
    filters = {
        "tables":[UserModel, CollectorModel, ArtistModel, AdminModel],
        "single":False,
        f"table__{UserModel.get_table_name()}__username":username,
        f"table__{UserModel.get_table_name()}__first_name":first_name,
        f"table__{UserModel.get_table_name()}__last_name":last_name,
        f"table__{UserModel.get_table_name()}__email":email,
        f"table__{UserModel.get_table_name()}__created_at":created_at,
        f"table__{UserModel.get_table_name()}__search__first_name":search__first_name,
        f"table__{UserModel.get_table_name()}__search__email":search__email,
        f"table__{UserModel.get_table_name()}__search__last_name":search__last_name,
        f"table__{UserModel.get_table_name()}__search__username":search__username,
        f"table__{ArtistModel.get_table_name()}__bio":bio,
        f"table__{ArtistModel.get_table_name()}__link":link,
        f"table__{ArtistModel.get_table_name()}__search__bio":search__bio,
        f"table__{AdminModel.get_table_name()}__privledge":privledge,
        f"table__{CollectorModel.get_table_name()}__rank":rank,
    }
    
    success, count, message, items = retrieve(**filters)

    return {"data": items, "success": success, "message": message, "count": count}


@router.post("/register")
def create_new_user(request_data: UserModel):
    success, message, data = insert(request_data)
    return {"message": message, "success": success, "data": data}

