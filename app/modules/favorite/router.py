from fastapi import APIRouter

from db.insert import insert
from db.delete import delete

from modules.favorite.model import FavoriteModel

router = APIRouter(prefix="/favorite", tags=['favorite'])

@router.post('/')
def favorite(favortie: FavoriteModel):
    success, message, data = insert(favortie)
    
    return {"message": message, "success": success, "data": data}


@router.delete('/')
def un_favorite(favortie: FavoriteModel):
    success, message = delete(
        table=FavoriteModel.get_table_name(),
        **favortie.to_dict()
    )
    
    return {"message": message, "success": success}