from fastapi import APIRouter

from db.model import Model
from modules.auction.model import AuctionModel

class BidModel(Model):
    price: str
    auction_id: int
    collector_id: int
    payment_done: bool = False
    
    @staticmethod
    def get_table_name() -> str:
        return "Bid"
    
    @staticmethod
    def create_table() -> str:
        return f"""
            CREATE TABLE {BidModel.get_table_name()} (
                bid_id SERIAL PRIMARY KEY,
                price DECIMAL NOT NULL,
                auction_id INT NOT NULL,
                collector_id INT NOT NULL,
                created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
                payment_done BOOLEAN NOT NULL DEFAULT False
                CONSTRAINT fk_auction
                    FOREIGN KEY(auction_id)
                        REFERENCES {AuctionModel.get_table_name()}(auction_id)
                        ON DELETE CASCADE
            );
            """
    
    @staticmethod
    def get_router() -> APIRouter:
        from modules.bid.router import router
        return router
        
    @staticmethod
    def get_create_order() -> int:
        return 13