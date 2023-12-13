from fastapi import APIRouter

from db.update import update
from db.insert import insert
from db.retrieve import retrieve
from db.delete import delete

from modules.report.model import ReportModel

router = APIRouter(prefix="/reports", tags=['reports'])

@router.get("/{report_id}")
def get_report(
    art_id: int
):
    success, _, message, items = retrieve(
        tables=[ReportModel],
        single=True,
        art_id=art_id
    )

    return {"data": items[0], "success": success, "message": message}


@router.get("/")
def get_reports(
    content: str | None = None,
    search__content: str | None = None,
    created_at: str | None = None,
    entity_name: str | None = None,
    entity_id: int | None = None,
    user_id: int | None = None,
):
    filters = {
        "tables": [ReportModel],
        "single": False,
        "content": content,
        "search__content": search__content,
        "created_at": created_at,
        "entity_name": entity_name,
        "entity_id": entity_id,
        "user_id": user_id
    }

    success, count, message, items = retrieve(**filters)

    return {"data": items, "success": success, "message": message, "count": count}


@router.post("/")
def create_new_report(report: ReportModel):
    success, message, data = insert(report)
    
    return {"message": message, "success": success, "data": data}


@router.delete("/{report_id}")
def delete_report(report_id: int):
    success, message = delete(
        table=ReportModel.get_table_name(),
        report_id=report_id
    )
    return {"message": message, "success": success}


@router.put("/{report_id}")
def update_art(report_id: int, request_data: ReportModel):
    success, message, report = update(
        table=ReportModel.get_table_name(),
        model=request_data.to_dict(),
        identifier=ReportModel.get_identifier(),
        report_id=report_id
    )
    
    return {"message": message, "success": success, "data": report}