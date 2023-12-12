from fastapi import APIRouter

from util.tables import Tables
from util.delete import delete
from util.update import update
from util.retrieve import retrieve
from util.insert import insert

from models import AuctionModel


router = APIRouter(prefix="/auctions", tags=['auctions'])

@router.get("/{auction_id}")
def get_auction(
    auction_id: int
):
    success, _, message, items = retrieve(
        table=Tables.Collector.value,
        single=True,
        auction_id=auction_id
    )

    return {"data": items[0], "success": success, "message": message}

@router.get("/")
def get_auctions(
    start_time: str | None = None,
    end_time: str | None = None,
    gt__start_time: str | None = None,
    gt__end_time: str | None = None,
    lt__start_time: str | None = None,
    lt__end_time: str | None = None,
    active: bool | None = None,
    art_id: int | None = None,
):
    success, count, message, items = retrieve(
        table=Tables.Auction.value,
        single=False,
        start_time=start_time,
        end_time=end_time,
        gt__end_time=gt__end_time,
        gt__start_time=gt__start_time,
        lt__end_time=lt__end_time,
        lt__start_time=lt__start_time,
        active=active,
        art_id=art_id
    )

    return {"data": items, "success": success, "message": message, "count": count}


@router.post("/")
def create_new_auction(request_data: AuctionModel):
    success, message = insert(request_data)
    return {"message": message, "success": success}

@router.delete("/{auction_id}")
def delete_auction(auction_id: int):
    success, message = delete(
        table=Tables.Auction.value,
        auction_id=auction_id
    )
    return {"message": message, "success": success}


@router.put("/{auction_id}")
def update_auction(auction_id: int, request_data: AuctionModel):
    success, message = update(
        table=Tables.Auction.value,
        model=request_data,
        auction_id=auction_id
    )
    return {"message": message, "success": success}