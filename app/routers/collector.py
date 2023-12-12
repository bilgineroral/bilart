from fastapi import APIRouter

from util.tables import Tables
from util.delete import delete
from util.update import update
from util.retrieve import retrieve
from util.insert import insert

from models import CollectorModel


router = APIRouter(prefix="/collectors", tags=['collectors'])

@router.get("/{collector_id}")
def get_collector(
    collector_id: int
):
    success, count, message, items = retrieve(
        table=Tables.Collector.value,
        single=True,
        collector_id=collector_id,
    )

    return {"data": items, "success": success, "message": message, "count": count}


@router.get("/")
def get_collectors(

):
    success, count, message, items = retrieve(
        table=Tables.Collector.value,
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
        table=Tables.Collector.value,
        collector_id=collector_id
    )
    return {"message": message, "success": success}

@router.put("/{collector_id}")
def update_collector(collector_id: int, request_data: CollectorModel):
    success, message = update(
        table=Tables.Collector.value,
        model=request_data,
        collector_id=collector_id
    )
    return {"message": message, "success": success}