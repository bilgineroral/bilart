from typing import Any
from fastapi import APIRouter, Depends
from modules.user.auth import get_current_user

from db.insert import insert
from db.delete import delete

from modules.favorite.model import FavoriteModel, CreateFavorite

router = APIRouter(prefix="/favorite", tags=['favorite'])

@router.post('/')
def favorite(request_data: CreateFavorite, user: dict[str, Any] = Depends(get_current_user)):
    success, message, data = insert(FavoriteModel(
        post_id=request_data.post_id,
        collector_id=user['collector_id']
    ), return_row=False)
    
    return {"message": message, "success": success, "data": data}


@router.delete('/')
def un_favorite(request_data: CreateFavorite, user: dict[str, Any] = Depends(get_current_user)):
    success, message = delete(
        table=FavoriteModel.get_table_name(),
        collector_id=user['collector_id'],
        post_id=request_data.post_id
    )
    
    return {"message": message, "success": success}