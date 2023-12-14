from fastapi import APIRouter
from pydantic import BaseModel

from db.model import Model
from modules.art.model import ArtModel

class AuctionModel(Model):
    start_time: str
    end_time: str
    active: bool = False
    art_id: int
    
    @staticmethod
    def get_table_name() -> str:
        return "Auction"
    
    @staticmethod
    def create_table() -> str:
        return f"""
            CREATE TABLE {AuctionModel.get_table_name()} (
                {AuctionModel.get_identifier()} SERIAL PRIMARY KEY,
                start_time TIMESTAMPTZ NOT NULL,
                end_time TIMESTAMPTZ NOT NULL,
                active BOOLEAN NOT NULL DEFAULT True,
                {ArtModel.get_identifier()} INT NOT NULL,
                CONSTRAINT end_time_after_start_time CHECK (end_time > start_time),
                CONSTRAINT fk_art
                    FOREIGN KEY({ArtModel.get_identifier()})
                        REFERENCES {ArtModel.get_table_name()}({ArtModel.get_identifier()})
                        ON DELETE CASCADE
            );
            """
    
    @staticmethod
    def get_router() -> APIRouter:
        from modules.auction.router import router
        return router
        
    @staticmethod
    def get_create_order() -> int:
        return 12
    
    @staticmethod
    def get_identifier() -> str:
        return "auction_id"
    

class UpdateAuction(BaseModel):
    start_time: str | None
    end_time: str | None
    active: bool | None