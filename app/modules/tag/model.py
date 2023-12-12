from fastapi import APIRouter
from db.model import Model


class TagModel(Model):
    name: str
    
    @staticmethod
    def get_table_name() -> str:
        return "Tag"
    
    @staticmethod
    def create_table() -> str:
        return f"""
            CREATE TABLE {TagModel.get_table_name()} (
                tag_name VARCHAR(255) PRIMARY KEY
            );
            """
    
    @staticmethod
    def get_router() -> APIRouter:
        from modules.tag.router import router
        return router
        
    @staticmethod
    def get_create_order() -> int:
        return 10