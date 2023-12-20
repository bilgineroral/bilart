from typing import Any
from fastapi import APIRouter, Depends
from modules.post.model import PostModel
from modules.art.model import ArtModel

from db.delete import delete
from db.update import update
from db.retrieve import retrieve
from db.insert import insert

from modules.auction.model import AuctionModel, UpdateAuction
from modules.user.auth import get_current_user


router = APIRouter(prefix="/auctions", tags=['auctions'])

@router.get("/{auction_id}")
def get_auction(
    auction_id: int
):
    success, _, message, items = retrieve(
        tables=[AuctionModel],
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
        tables=[AuctionModel],
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
def create_new_auction(request_data: AuctionModel, user: dict[str, Any] = Depends(get_current_user)):
    filters = {
        'tables': [PostModel, ArtModel],
        'single': True,
        f'table__{ArtModel.get_table_name()}__art_id':  request_data.art_id,
        f'table__{PostModel.get_table_name()}__artist_id': user['artist_id'],
    }
    
    retrieve(**filters)
    
    success, message, data = insert(request_data)
    return {"message": message, "success": success, "data": data}

@router.delete("/{auction_id}")
def delete_auction(auction_id: int, user: dict[str, Any] = Depends(get_current_user)):
    filters = {
        'tables': [PostModel, ArtModel, AuctionModel],
        'single': True,
        f'table__{PostModel.get_identifier()}__artist_id': user['artist_id'],
        f'table__{AuctionModel.get_identifier()}__auction_id': auction_id,
    }
    
    retrieve(**filters)
    
    success, message = delete(
        table=AuctionModel.get_table_name(),
        auction_id=auction_id
    )
    return {"message": message, "success": success}


@router.put("/{auction_id}")
def update_auction(auction_id: int, request_data: UpdateAuction, user: dict[str, Any] = Depends(get_current_user)):
    filters = {
        'tables': [PostModel, ArtModel, AuctionModel],
        'single': True,
        f'table__{PostModel.get_table_name()}__artist_id': user['artist_id'],
        f'table__{AuctionModel.get_table_name()}__auction_id': auction_id,
    }
    
    retrieve(**filters)
    
    success, message, data = update(
        table=AuctionModel.get_table_name(),
        model={
            'start_time': request_data.start_time,
            'end_time': request_data.end_time,
            'active': request_data.active
        },
        identifier=AuctionModel.get_identifier(),
        auction_id=auction_id
    )
    return {"message": message, "success": success, "data": data}