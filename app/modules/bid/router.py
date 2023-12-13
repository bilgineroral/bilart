from fastapi import APIRouter

from db.delete import delete
from db.update import update
from db.retrieve import retrieve
from db.insert import insert

from modules.bid.model import BidModel


router = APIRouter(prefix="/bids", tags=['bids'])

@router.get("/{bid_id}")
def get_bid(
    bid_id: int
):
    success, _, message, items = retrieve(
        tables=[BidModel],
        single=True,
        bid_id=bid_id
    )

    return {"data": items[0], "success": success, "message": message}

@router.get("/")
def get_bids(
    bid_id: int | None = None,
    price: str | None = None,
    gt__price: str | None = None,
    lt__price: str | None = None, 
    auction_id: int | None = None,
    collector_id: int | None = None,
    payment_done: bool | None = None,
    created_at: str | None = None
):
    success, count, message, items = retrieve(
        tables=[BidModel],
        single=False,
        bid_id=bid_id,
        price=price,
        gt__price=gt__price,
        lt__price=lt__price,
        auction_id=auction_id,
        collector_id=collector_id,
        payment_done=payment_done,
        created_at=created_at
    )

    return {"data": items, "success": success, "message": message, "count": count}


@router.post("/")
def create_new_bid(request_data: BidModel):
    success, message, data = insert(request_data)
    return {"message": message, "success": success, "data": data}

@router.delete("/{bid_id}")
def delete_bid(bid_id: int):
    success, message = delete(
        table=BidModel.get_table_name(),
        bid_id=bid_id
    )
    return {"message": message, "success": success}


@router.put("/{bid_id}")
def update_bid(bid_id: int, request_data: BidModel):
    success, message, data = update(
        table=BidModel.get_table_name(),
        model=request_data.to_dict(),
        identifier=BidModel.get_identifier(),
        bid_id=bid_id
    )
    return {"message": message, "success": success, "data": data}