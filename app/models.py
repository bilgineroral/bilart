
from typing import Any
from pydantic import BaseModel
from abc import ABC

from util.tables import Tables


class Model(BaseModel, ABC):
    @staticmethod
    def get_table_name() -> str:
        ...
        
    def to_dict(self) -> dict[str, Any]:
        return dict(self)


class UserModel(Model):
    username: str
    first_name: str | None = None
    last_name: str | None = None
    email: str
    password: str
    phone: str | None = None

    @staticmethod
    def get_table_name() -> str:
        return Tables.User.value
    
    def to_dict(self) -> dict[str, Any]:
        data = super().to_dict()
        data['password_hash'] = data.pop('password') # TODO: hash password
        return data


class CollectorModel(Model):
    user_id: int

    @staticmethod
    def get_table_name() -> str:
        return Tables.Collector.value


class ArtistModel(Model):
    user_id: int
    bio: str | None = None
    link: str | None = None

    @staticmethod
    def get_table_name() -> str:
        return Tables.Artist.value


class AdminModel(Model):
    user_id: int
    privileges: str

    @staticmethod
    def get_table_name() -> str:
        return Tables.Admin.value


class ArtModel(Model):
    content: str
    initial_price: str | None = None
    artist_id: int

    @staticmethod
    def get_table_name() -> str:
        return Tables.Art.value


class CollectionModel(Model):
    collector_id: int
    name: str
    
    @staticmethod
    def get_table_name() -> str:
        return Tables.Collection.value


class RatingModel(Model):
    score: int
    comment: str
    art_id: int
    collector_id: int
    
    @staticmethod
    def get_table_name() -> str:
        return Tables.Rating.value


class TagModel(Model):
    name: str
    
    @staticmethod
    def get_table_name() -> str:
        return Tables.Tag.value
    

class AuctionModel(Model):
    start_time: str
    end_time: str
    active: bool = False
    art_id: int
    
    @staticmethod
    def get_table_name() -> str:
        return Tables.Auction.value


class BidModel(Model):
    price: str
    auction_id: int
    collector_id: int
    payment_done: bool = False
    
    @staticmethod
    def get_table_name() -> str:
        return Tables.Bid.value