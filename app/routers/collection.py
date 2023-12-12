from fastapi import APIRouter

from util.tables import Tables
from util.delete import delete
from util.update import update
from util.retrieve import retrieve
from util.insert import insert

from models import CollectionModel


router = APIRouter(prefix="/collections", tags=['collections'])

@router.get("/{collection_id}")
def get_collection(
    collection_id: int
):
    success, _, message, items = retrieve(
        table=Tables.Collector.value,
        single=True,
        collection_id=collection_id
    )

    return {"data": items[0], "success": success, "message": message}

@router.get("/")
def get_collections(
    collection_id: int | None = None,
    name: str | None = None,
    collector_id: int | None = None,
):
    success, count, message, items = retrieve(
        table=Tables.Collection.value,
        single=False,
        name=name,
        collector_id=collector_id,
        collection_id=collection_id,
    )

    return {"data": items, "success": success, "message": message, "count": count}


@router.post("/")
def create_new_collection(request_data: CollectionModel):
    success, message = insert(request_data)
    return {"message": message, "success": success}


@router.delete("/{collection_id}")
def delete_collections(collection_id: int):
    success, message = delete(
        table=Tables.Collection.value,
        collection_id=collection_id
    )
    return {"message": message, "success": success}


@router.put("/{collection_id}")
def update_collections(collection_id: int, request_data: CollectionModel):
    success, message = update(
        table=Tables.Collection.value,
        model=request_data,
        collection_id=collection_id
    )
    return {"message": message, "success": success}