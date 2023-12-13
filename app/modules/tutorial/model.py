from fastapi import APIRouter
from pydantic import BaseModel
from db.model import Model

from modules.post.model import PostModel

class TutorialModel(Model):
    media: str
    post_id: int

    @staticmethod
    def get_table_name() -> str:
        return "Tutorial"
    
    @staticmethod
    def create_table() -> str:
        return f"""
            CREATE TABLE {TutorialModel.get_table_name()} (
                art_id SERIAL PRIMARY KEY,
                media VARCHAR(255),
                post_id INT NOT NULL,
                CONSTRAINT fk_post
                    FOREIGN KEY(post_id)
                        REFERENCES {PostModel.get_table_name()}(post_id)
                        ON DELETE CASCADE
            );
            """
    
    @staticmethod
    def get_router() -> APIRouter:
        from modules.tutorial.router import router
        return router
        
    @staticmethod
    def get_create_order() -> int:
        return 8
    
    
class UpdateTutorial(BaseModel):
    media: str | None
    post_id: int | None
    title: str | None
    description: str | None