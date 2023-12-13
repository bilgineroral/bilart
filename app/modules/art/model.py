from fastapi import APIRouter
from pydantic import BaseModel

from db.model import Model
from modules.post.model import PostModel

class ArtModel(Model):
    content: str
    post_id: int

    @staticmethod
    def get_table_name() -> str:
        return "Art"
    
    @staticmethod
    def create_table() -> str:
        return f"""
            CREATE TABLE {ArtModel.get_table_name()} (
                art_id SERIAL PRIMARY KEY,
                content VARCHAR(255),
                post_id INT NOT NULL,
                CONSTRAINT fk_post
                    FOREIGN KEY(post_id)
                        REFERENCES {PostModel.get_table_name()}(post_id)
                        ON DELETE CASCADE
            );
            """
    
    @staticmethod
    def get_router() -> APIRouter:
        from modules.art.router import router
        return router
        
    @staticmethod
    def get_create_order() -> int:
        return 6


class CreateArt(BaseModel):
    ...