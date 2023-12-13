from fastapi import APIRouter

from db.delete import delete
from db.update import update
from db.retrieve import retrieve
from db.insert import insert

from modules.collection.model import CollectionModel


router = APIRouter(prefix="/collections", tags=['collections'])

@router.get("/{collection_id}")
def get_collection(
    collection_id: int
):
    success, _, message, items = retrieve(
        tables=CollectionModel.get_table_name(),
        single=True,
        collection_id=collection_id
    )

    return {"data": items[0], "success": success, "message": message}

@router.get("/")
def get_collections(
    name: str | None = None,
    search__name: str | None = None,
    collector_id: int | None = None,
):
    success, count, message, items = retrieve(
        tables=CollectionModel.get_table_name(),
        single=False,
        search__name=search__name,
        name=name,
        collector_id=collector_id,
    )

    return {"data": items, "success": success, "message": message, "count": count}


@router.post("/")
def create_new_collection(request_data: CollectionModel):
    success, message = insert(request_data)
    return {"message": message, "success": success}


@router.delete("/{collection_id}")
def delete_collections(collection_id: int):
    success, message = delete(
        table=CollectionModel.get_table_name(),
        collection_id=collection_id
    )
    return {"message": message, "success": success}


@router.put("/{collection_id}")
def update_collections(collection_id: int, request_data: CollectionModel):
    success, message = update(
        table=CollectionModel.get_table_name(),
        model=request_data,
        collection_id=collection_id
    )
    return {"message": message, "success": success}