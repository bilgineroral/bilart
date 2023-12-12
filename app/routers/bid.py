from fastapi import APIRouter

from util.tables import Tables
from util.delete import delete
from util.update import update
from util.retrieve import retrieve
from util.insert import insert

from models import BidModel


router = APIRouter(prefix="/bids", tags=['bids'])

@router.get("/{bid_id}")
def get_bid(
    bid_id: int
):
    success, _, message, items = retrieve(
        table=Tables.Collector.value,
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
        table=Tables.Tag.value,
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
    success, message = insert(request_data)
    return {"message": message, "success": success}

@router.delete("/{bid_id}")
def delete_bid(bid_id: int):
    success, message = delete(
        table=Tables.Bid.value,
        bid_id=bid_id
    )
    return {"message": message, "success": success}


@router.put("/{bid_id}")
def update_bid(bid_id: int, request_data: BidModel):
    success, message = update(
        table=Tables.Bid.value,
        model=request_data,
        bid_id=bid_id
    )
    return {"message": message, "success": success}
