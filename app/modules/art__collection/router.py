from fastapi import APIRouter

from db.insert import insert
from db.delete import delete

from modules.art__collection.model import ArtCollectionModel


router = APIRouter(prefix="/collect", tags=['collect'])


@router.post('/')
def collect(art_collection: ArtCollectionModel):
    success, message, data = insert(art_collection)
    
    return {"message": message, "success": success, "data": data}


@router.delete('/')
def un_collect(art_collection: ArtCollectionModel):
    success, message = delete(
        table=ArtCollectionModel.get_table_name(),
        **art_collection.to_dict()
    )
    
    return {"message": message, "success": success}