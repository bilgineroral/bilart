from fastapi import APIRouter
from db.model import Model

from modules.tag.model import TagModel
from modules.post.model import PostModel

class TagPostModel(Model):
    @staticmethod
    def get_table_name() -> str:
        return "Tag__Post"
    
    @staticmethod
    def create_table() -> str:
        return f"""
            CREATE TABLE {TagPostModel.get_table_name()} (
                tag_name VARCHAR(255) REFERENCES {TagModel.get_table_name()}(tag_name),
                post_id SERIAL REFERENCES {PostModel.get_table_name()}(post_id),
                CONSTRAINT tag_art_pk PRIMARY KEY(tag_name, post_id)
            );
            """
            
    
    @staticmethod
    def get_router() -> APIRouter:
        from modules.tag__post.router import router
        return router
        
    @staticmethod
    def get_create_order() -> int:
        return 11