from fastapi import APIRouter

from util.tables import Tables
from util.delete import delete
from util.update import update
from util.retrieve import retrieve
from util.insert import insert

from models import AdminModel


router = APIRouter(prefix="/admins", tags=['admins'])

@router.get("/{admin_id}")
def get_admin(
    admin_id: int
):
    success, _, message, items = retrieve(
        table=Tables.Collector.value,
        single=True,
        admin_id=admin_id
    )

    return {"data": items[0], "success": success, "message": message}

@router.get("/")
def get_admins(
    privledges: str | None = None,
):
    success, count, message, items = retrieve(
        table=Tables.Collector.value,
        single=False,
        privledges=privledges
    )

    return {"data": items, "success": success, "message": message, "count": count}


@router.post("/")
def create_new_admin(request_data: AdminModel):
    success, message = insert(request_data)
    return {"message": message, "success": success}


@router.delete("/{admin_id}")
def delete_admin(admin_id: int):
    success, message = delete(
        table=Tables.Admin.value,
        admin_id=admin_id
    )
    return {"message": message, "success": success}


@router.put("/{admin_id}")
def update_admin(admin_id: int, request_data: AdminModel):
    success, message = update(
        table=Tables.Admin.value,
        model=request_data,
        admin_id=admin_id
    )
    return {"message": message, "success": success}