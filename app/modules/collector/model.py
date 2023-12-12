from fastapi import APIRouter

from db.model import Model
from modules.user.model import UserModel

class CollectorModel(Model):
    user_id: int
    rank: int

    @staticmethod
    def get_table_name() -> str:
        return "Collector"
    
    @staticmethod
    def create_table() -> str:
        return f"""
            CREATE TABLE {CollectorModel.get_table_name()} (
                collector_id SERIAL PRIMARY KEY,
                user_id INT UNIQUE NOT NULL,
                rank INT NOT NULL DEFAULT 0,
                FOREIGN KEY (user_id) REFERENCES {UserModel.get_table_name()} (user_id)
            );
            """
    
    @staticmethod
    def get_router() -> APIRouter:
        from modules.collector.router import router
        return router
        
    @staticmethod
    def get_create_order() -> int:
        return 1