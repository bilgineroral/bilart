from fastapi import APIRouter
from pydantic import BaseModel
from fastapi import Form, File, UploadFile

from db.model import Model
from modules.post.model import PostModel

class ArtModel(Model):
    price: float
    content: str
    post_id: int

    @staticmethod
    def get_table_name() -> str:
        return "Art"
    
    @staticmethod
    def create_table() -> str:
        return f"""
            CREATE TABLE {ArtModel.get_table_name()} (
                {ArtModel.get_identifier()} SERIAL PRIMARY KEY,
                content VARCHAR(255),
                price DECIMAL NOT NULL,
                {PostModel.get_identifier()} INT NOT NULL,
                CONSTRAINT fk_post
                    FOREIGN KEY({PostModel.get_identifier()})
                        REFERENCES {PostModel.get_table_name()}({PostModel.get_identifier()})
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
        
    @staticmethod
    def get_identifier() -> str:
        return "art_id"


class CreateArt(BaseModel):
    content: str
    title: str
    description: str


class UpdateArt(BaseModel):
    content: str | None
    title: str | None
    description: str | None