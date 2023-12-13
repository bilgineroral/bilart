from fastapi import APIRouter

from db.insert import insert
from db.delete import delete

from modules.tag__post.model import TagPostModel

router = APIRouter(prefix="/categorise", tags=['categorise'])

@router.post('/')
def categorise(favortie: TagPostModel):
    success, message, data = insert(favortie)
    
    return {"message": message, "success": success, "data": data}


@router.delete('/')
def un_categorise(favortie: TagPostModel):
    success, message = delete(
        table=TagPostModel.get_table_name(),
        **favortie.to_dict()
    )
    
    return {"message": message, "success": success}