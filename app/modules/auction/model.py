from fastapi import APIRouter

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
                auction_id SERIAL PRIMARY KEY,
                start_time TIMESTAMPTZ NOT NULL,
                end_time TIMESTAMPTZ NOT NULL,
                active BOOLEAN NOT NULL DEFAULT True,
                art_id INT NOT NULL,
                CONSTRAINT fk_art
                    FOREIGN KEY(art_id)
                        REFERENCES {ArtModel.get_table_name()}(art_id)
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