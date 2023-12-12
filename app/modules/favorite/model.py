from fastapi import APIRouter
from db.model import Model

from modules.collector.model import CollectorModel
from modules.post.model import PostModel

class FavoriteModel(Model):
    collector_id: int
    post_id: int

    @staticmethod
    def get_table_name() -> str:
        return "Favorite"
    
    @staticmethod
    def create_table() -> str:
        return f"""
            CREATE TABLE {FavoriteModel.get_table_name()}(
                collector_id INT,
                post_id INT,
                CONSTRAINT fk_collector
                    FOREIGN KEY(collector_id)
                        REFERENCES {CollectorModel.get_table_name()}(collector_id)
                        ON DELETE CASCADE,
                CONSTRAINT post_id
                    FOREIGN KEY(post_id)
                        REFERENCES {PostModel.get_table_name()}(post_id)
                        ON DELETE CASCADE,
                CONSTRAINT collector_post_pk PRIMARY KEY(collector_id, post_id)
            );
            """
    

    @staticmethod
    def get_router() -> APIRouter:
        from modules.favorite.router import router
        return router
        
    @staticmethod
    def get_create_order() -> int:
        return 14