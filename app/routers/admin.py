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
    admin_id: int | None = None,
    privledges: str | None = None,
    username: str | None = None,
    first_name: str | None = None,
    last_name: str | None = None,
    email: str | None = None,
    created_at: str | None = None
):
    success, count, message, items = retrieve(
        table=Tables.Collector.value,
        single=False,
        admin_id=admin_id,
        privledges=privledges,
        username=username,
        first_name=first_name,
        last_name=last_name,
        email=email,
        created_at=created_at
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