from fastapi import APIRouter

from db.delete import delete
from db.update import update
from db.retrieve import retrieve
from db.insert import insert

from modules.admin.model import AdminModel


router = APIRouter(prefix="/admins", tags=['admins'])

@router.get("/{admin_id}")
def get_admin(
    admin_id: int
):
    success, _, message, items = retrieve(
        table=AdminModel.get_table_name(),
        single=True,
        admin_id=admin_id
    )

    return {"data": items[0], "success": success, "message": message}

@router.get("/")
def get_admins(
    privledges: str | None = None,
):
    success, count, message, items = retrieve(
        table=AdminModel.get_table_name(),
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
        table=AdminModel.get_table_name(),
        admin_id=admin_id
    )
    return {"message": message, "success": success}


@router.put("/{admin_id}")
def update_admin(admin_id: int, request_data: AdminModel):
    success, message = update(
        table=AdminModel.get_table_name(),
        model=request_data,
        admin_id=admin_id
    )
    return {"message": message, "success": success}