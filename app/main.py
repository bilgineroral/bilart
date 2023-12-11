from fastapi import FastAPI
from models import *
from util.delete import delete

from util.tables import Tables
from util.update import update
from util.create_table import create_tables as util_create_tables
from util.retrieve import *
from util.insert import *


app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/create_tables")
def create_tables():
    result, message = util_create_tables()
    print(message)
    return {"result": result, "message": message}


@app.get("/users/")
def get_users(
    user_id: int | None = None,
    username: str | None = None,
    first_name: str | None = None,
    last_name: str | None = None,
    email: str | None = None,
    created_at: str | None = None
):
    success, message, users = retrieve(
        table=Tables.User.value,
        user_id=user_id,
        username=username,
        first_name=first_name,
        last_name=last_name,
        email=email,
        created_at=created_at
    )

    return {"data": users, "success": success, "message": message}


@app.post("/users")
def create_new_user(request_data: UserModel):
    success, message = insert(request_data)
    return {"message": message, "success": success}


@app.delete("/users")
def delete_user(user_id: int):
    success, message = delete(
        table=Tables.User.value,
        user_id=user_id
    )
    return {"message": message, "success": success}


@app.put("/users")
def update_user(user_id: int, request_data: UserModel):
    success, message = update(
        table=Tables.User.value,
        model=request_data,
        user_id=user_id
    )
    return {"message": message, "success": success}


@app.get("/collectors/")
def get_collectors(
    collector_id: int | None = None,
    username: str | None = None,
    first_name: str | None = None,
    last_name: str | None = None,
    email: str | None = None,
    created_at: str | None = None
):
    success, message, users = retrieve(
        table=Tables.Collector.value,
        collector_id=collector_id,
        username=username,
        first_name=first_name,
        last_name=last_name,
        email=email,
        created_at=created_at
    )

    return {"data": users, "success": success, "message": message}


@app.post("/collectors/")
def create_new_collector(request_data: CollectorModel):
    success, message = insert(request_data)
    return {"message": message, "success": success}


@app.delete("/collectors")
def delete_collector(collector_id: int):
    success, message = delete(
        table=Tables.Collector.value,
        collector_id=collector_id
    )
    return {"message": message, "success": success}


@app.put("/collectors")
def update_collector(collector_id: int, request_data: CollectorModel):
    success, message = update(
        table=Tables.Collector.value,
        model=request_data,
        collector_id=collector_id
    )
    return {"message": message, "success": success}



@app.get("/admins/")
def get_admins(
    admin_id: int | None = None,
    privledges: str | None = None,
    username: str | None = None,
    first_name: str | None = None,
    last_name: str | None = None,
    email: str | None = None,
    created_at: str | None = None
):
    success, message, users = retrieve(
        table=Tables.Collector.value,
        admin_id=admin_id,
        privledges=privledges,
        username=username,
        first_name=first_name,
        last_name=last_name,
        email=email,
        created_at=created_at
    )

    return {"data": users, "success": success, "message": message}


@app.post("/admins/")
def create_new_admin(request_data: AdminModel):
    success, message = insert(request_data)
    return {"message": message, "success": success}


@app.delete("/admins")
def delete_admin(admin_id: int):
    success, message = delete(
        table=Tables.Admin.value,
        admin_id=admin_id
    )
    return {"message": message, "success": success}


@app.put("/admins")
def update_admin(admin_id: int, request_data: AdminModel):
    success, message = update(
        table=Tables.Admin.value,
        model=request_data,
        admin_id=admin_id
    )
    return {"message": message, "success": success}


@app.get("/artists/")
def get_artists(
    artist_id: int | None = None,
    username: str | None = None,
    first_name: str | None = None,
    last_name: str | None = None,
    email: str | None = None,
    link: str | None = None,
    bio: str | None = None,
    created_at: str | None = None
):
    success, message, users = retrieve(
        table=Tables.Artist.value,
        artist_id=artist_id,
        username=username,
        first_name=first_name,
        last_name=last_name,
        link=link,
        bio=bio,
        email=email,
        created_at=created_at
    )

    return {"data": users, "success": success, "message": message}


@app.post("/artists/")
def create_new_artist(request_data: ArtistModel):
    success, message = insert(request_data)
    return {"message": message, "success": success}


@app.delete("/artists")
def delete_artists(artist_id: int):
    success, message = delete(
        table=Tables.Artist.value,
        artist_id=artist_id
    )
    return {"message": message, "success": success}


@app.put("/artists")
def update_artists(artist_id: int, request_data: ArtistModel):
    success, message = update(
        table=Tables.Artist.value,
        model=request_data,
        artist_id=artist_id
    )
    return {"message": message, "success": success}


@app.get("/arts/")
def get_arts(
    art_id: int | None = None,
    content: str | None = None,
    initial_price: str | None = None,
    collection_id: int | None = None,
    artist_id: int | None = None,
    created_at: str | None = None,
):
    success, message, users = retrieve(
        table=Tables.Art.value,
        art_id=art_id,
        conent=content,
        initial_price=initial_price,
        collection_id=collection_id,
        artist_id=artist_id,
        created_at=created_at
    )

    return {"data": users, "success": success, "message": message}


@app.post("/arts/")
def create_new_art(request_data: ArtModel):
    success, message = insert(request_data)
    return {"message": message, "success": success}


@app.get("/collections/")
def get_collections(
    collection_id: int | None = None,
    name: str | None = None,
    collector_id: int | None = None,
):
    success, message, users = retrieve(
        table=Tables.Collection.value,
        name=name,
        collector_id=collector_id,
        collection_id=collection_id,
    )

    return {"data": users, "success": success, "message": message}


@app.post("/collections/")
def create_new_collection(request_data: CollectionModel):
    success, message = insert(request_data)
    return {"message": message, "success": success}


@app.delete("/collections")
def delete_collections(collection_id: int):
    success, message = delete(
        table=Tables.Collection.value,
        collection_id=collection_id
    )
    return {"message": message, "success": success}


@app.put("/collections")
def update_collections(collection_id: int, request_data: CollectionModel):
    success, message = update(
        table=Tables.Collection.value,
        model=request_data,
        collection_id=collection_id
    )
    return {"message": message, "success": success}


@app.get("/ratings/")
def get_ratings(
    rating_id: int | None = None,
    score: int | None = None,
    comment: str | None = None,
    art_id: int | None = None,
    collector_id: int | None = None
):
    success, message, users = retrieve(
        table=Tables.Rating.value,
        rating_id=rating_id,
        score=score,
        comment=comment,
        art_id=art_id,
        collector_id=collector_id
    )

    return {"data": users, "success": success, "message": message}


@app.post("/ratings/")
def create_new_rating(request_data: RatingModel):
    success, message = insert(request_data)
    return {"message": message, "success": success}


@app.delete("/ratings")
def delete_ratings(rating_id: int):
    success, message = delete(
        table=Tables.Rating.value,
        rating_id=rating_id
    )
    return {"message": message, "success": success}


@app.put("/ratings")
def update_ratings(rating_id: int, request_data: RatingModel):
    success, message = update(
        table=Tables.Rating.value,
        model=request_data,
        rating_id=rating_id
    )
    return {"message": message, "success": success}


@app.get("/tags/")
def get_tags(
    name: str | None = None,
):
    success, message, users = retrieve(
        table=Tables.Tag.value,
        name=name
    )

    return {"data": users, "success": success, "message": message}


@app.post("/tags/")
def create_new_tag(request_data: TagModel):
    success, message = insert(request_data)
    return {"message": message, "success": success}


@app.delete("/tags")
def delete_tags(name: str):
    success, message = delete(
        table=Tables.Tag.value,
        name=name
    )
    return {"message": message, "success": success}


@app.put("/tags")
def update_tags(name: str, request_data: TagModel):
    success, message = update(
        table=Tables.Tag.value,
        model=request_data,
        name=name
    )
    return {"message": message, "success": success}


@app.get("/auctions/")
def get_auctions(
    auction_id: int | None = None,
    start_time: str | None = None,
    end_time: str | None = None,
    active: bool | None = None,
    art_id: int | None = None,
):
    success, message, users = retrieve(
        table=Tables.Auction.value,
        auction_id=auction_id,
        start_time=start_time,
        end_time=end_time,
        active=active,
        art_id=art_id
    )

    return {"data": users, "success": success, "message": message}


@app.post("/auctions/")
def create_new_auction(request_data: AuctionModel):
    success, message = insert(request_data)
    return {"message": message, "success": success}

@app.delete("/auctions")
def delete_auction(auction_id: int):
    success, message = delete(
        table=Tables.Auction.value,
        auction_id=auction_id
    )
    return {"message": message, "success": success}


@app.put("/auctions")
def update_auction(auction_id: int, request_data: AuctionModel):
    success, message = update(
        table=Tables.Auction.value,
        model=request_data,
        auction_id=auction_id
    )
    return {"message": message, "success": success}


@app.get("/bids/")
def get_bids(
    bid_id: int | None = None,
    price: str | None = None,
    auction_id: int | None = None,
    collector_id: int | None = None,
    payment_done: bool | None = None,
    created_at: str | None = None
):
    success, message, users = retrieve(
        table=Tables.Tag.value,
        bid_id=bid_id,
        price=price,
        auction_id=auction_id,
        collector_id=collector_id,
        payment_done=payment_done,
        created_at=created_at
    )

    return {"data": users, "success": success, "message": message}


@app.post("/bids/")
def create_new_bid(request_data: BidModel):
    success, message = insert(request_data)
    return {"message": message, "success": success}

@app.delete("/bids")
def delete_bid(bid_id: int):
    success, message = delete(
        table=Tables.Bid.value,
        bid_id=bid_id
    )
    return {"message": message, "success": success}


@app.put("/bids")
def update_bid(bid_id: int, request_data: BidModel):
    success, message = update(
        table=Tables.Bid.value,
        model=request_data,
        bid_id=bid_id
    )
    return {"message": message, "success": success}
