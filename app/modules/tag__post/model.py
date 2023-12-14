from fastapi import APIRouter
from db.model import Model

from modules.tag.model import TagModel
from modules.post.model import PostModel


class TagPostModel(Model):
    post_id: int
    tag_name: str
    
    @staticmethod
    def get_table_name() -> str:
        return "Tag__Post"

    @staticmethod
    def create_table() -> str:
        return f"""
            CREATE TABLE {TagPostModel.get_table_name()} (
                {TagModel.get_identifier()} VARCHAR(255) REFERENCES {TagModel.get_table_name()}(tag_name),
                {PostModel.get_identifier()} SERIAL REFERENCES {PostModel.get_table_name()}(post_id),
                CONSTRAINT {TagPostModel.get_identifier()} 
                    UNIQUE ({TagModel.get_identifier()}, {PostModel.get_identifier()})
            );
            """

    @staticmethod
    def get_router() -> APIRouter:
        from modules.tag__post.router import router
        return router

    @staticmethod
    def get_create_order() -> int:
        return 11

    @staticmethod
    def get_identifier() -> str:
        return "tag_post_pk"
