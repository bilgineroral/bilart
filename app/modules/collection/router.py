from typing import Tuple
from fastapi import APIRouter, HTTPException

from db.delete import delete
from db.update import update
from db.retrieve import retrieve

from db.insert import insert

from modules.collection.model import CollectionModel
from db.db import PgDatabase


router = APIRouter(prefix="/collections", tags=['collections'])

"""@router.get("/{collection_id}")
def get_collection(
    collection_id: int
):
    success, _, message, items = retrieve(
        tables=[CollectionModel],
        single=True,
        collection_id=collection_id
    )

    return {"data": items[0], "success": success, "message": message}"""

@router.get("/{collection_id}")
def get_collection(
    collection_id: int,
    tag: list[str] | None = None,
):
    with PgDatabase() as db:
        try:
            db.cursor.execute(f"""
                SELECT * FROM collection_view
                WHERE collection_id = {collection_id} AND tag_name = {tag}
            """)
            data: list[Tuple] = db.cursor.fetchall()
            count = len(data)
            """if single:
                if count > 1:
                    raise HTTPException(status_code=400, detail=f"More than one object returned:{count}")
                elif count == 0:
                    print("here")
                    raise HTTPException(status_code=404, detail=f"Object not found")"""
            columns: list[str] = [desc[0] for desc in db.cursor.description]
            return True, count, "Data retrieved successfully", [dict(zip(columns, row)) for row in data]
        except HTTPException as e:
            raise e
        except Exception as e:
            print(e)
            raise HTTPException(status_code=500, detail=str(e))

@router.get("/")
def get_collections(
    name: str | None = None,
    search__name: str | None = None,
    collector_id: int | None = None,
):
    success, count, message, items = retrieve(
        tables=[CollectionModel],
        single=False,
        search__name=search__name,
        name=name,
        collector_id=collector_id,
    )

    return {"data": items, "success": success, "message": message, "count": count}


@router.post("/")
def create_new_collection(request_data: CollectionModel):
    success, message, data = insert(request_data)
    return {"message": message, "success": success, "data": data}


@router.delete("/{collection_id}")
def delete_collections(collection_id: int):
    success, message = delete(
        table=CollectionModel.get_table_name(),
        collection_id=collection_id
    )
    return {"message": message, "success": success}


@router.put("/{collection_id}")
def update_collections(collection_id: int, request_data: CollectionModel):
    success, message, data = update(
        table=CollectionModel.get_table_name(),
        model=request_data.to_dict(),
        identifier=CollectionModel.get_identifier(),
        collection_id=collection_id
    )
    return {"message": message, "success": success, "data": data}