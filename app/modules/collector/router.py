from fastapi import APIRouter

from db.delete import delete
from db.update import update
from db.retrieve import retrieve
from db.insert import insert

from modules.collector.model import CollectorModel


router = APIRouter(prefix="/collectors", tags=['collectors'])

@router.get("/{collector_id}")
def get_collector(
    collector_id: int
):
    success, count, message, items = retrieve(
        tables=[CollectorModel],
        single=True,
        collector_id=collector_id,
    )

    return {"data": items, "success": success, "message": message, "count": count}


@router.get("/")
def get_collectors(

):
    success, count, message, items = retrieve(
        tables=[CollectorModel],
        single=False,
    )

    return {"data": items, "success": success, "message": message, "count": count}


@router.post("/")
def create_new_collector(request_data: CollectorModel):
    success, message = insert(request_data)
    return {"message": message, "success": success}


@router.delete("/{collector_id}")
def delete_collector(collector_id: int):
    success, message = delete(
        table=CollectorModel.get_table_name(),
        collector_id=collector_id
    )
    return {"message": message, "success": success}

@router.put("/{collector_id}")
def update_collector(collector_id: int, request_data: CollectorModel):
    success, message = update(
        table=CollectorModel.get_table_name(),
        model=request_data,
        collector_id=collector_id
    )
    return {"message": message, "success": success}