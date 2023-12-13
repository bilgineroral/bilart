from fastapi import APIRouter

from db.delete import delete
from db.update import update
from db.retrieve import retrieve
from db.insert import insert

from modules.tag.model import TagModel


router = APIRouter(prefix="/tags", tags=['tags'])

@router.get("/{name}")
def get_tag(
    name: str
):
    success, _, message, items = retrieve(
        tables=[TagModel],
        single=True,
        name=name
    )

    return {"data": items[0], "success": success, "message": message}


@router.get("/")
def get_tags(
    search__name: str | None = None,
):
    success, count, message, items = retrieve(
        tables=[TagModel],
        single=False,
        search__name=search__name
    )

    return {"data": items, "success": success, "message": message, "count": count}


@router.post("/")
def create_new_tag(request_data: TagModel):
    success, message, data = insert(request_data)
    return {"message": message, "success": success, "data": data}


@router.delete("/{name}")
def delete_tags(name: str):
    success, message = delete(
        table=TagModel.get_table_name(),
        tag_name=name
    )
    return {"message": message, "success": success}


@router.put("/{name}")
def update_tags(name: str, request_data: TagModel):
    success, message, data = update(
        table=TagModel.get_table_name(),
        model=request_data.to_dict(),
        tag_name=name,
        identifier=TagModel.get_identifier()
    )
    return {"message": message, "success": success, "data": data}