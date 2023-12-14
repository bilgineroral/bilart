from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from modules.user.auth import get_current_user

from db.retrieve import retrieve

from modules.report.model import ReportModel

router = APIRouter(prefix="/reports", tags=['reports'])

@router.get("/{report_id}")
def get_report(
    art_id: int,
    user: dict[str, Any] = Depends(get_current_user)
):
    if user['privileges'] == 'N':
        raise HTTPException(status_code=401, detail="Not authorized")
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
    user: dict[str, Any] = Depends(get_current_user)
):
    if user['privileges'] == 'N':
        raise HTTPException(status_code=401, detail="Not authorized")
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

