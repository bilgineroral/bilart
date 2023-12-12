from fastapi import APIRouter
from db.model import Model

from modules.artist.model import ArtistModel

class PostModel(Model):
    @staticmethod
    def get_table_name() -> str:
        return "Post"
    
    @staticmethod
    def create_table() -> str:
        return f"""
        CREATE TABLE {PostModel.get_table_name()} (
            post_id SERIAL PRIMARY KEY,
            artist_id INT NOT NULL,
            created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
            title VARCHAR(128),
            description VARCHAR(256),
            CONSTRAINT fk_artist
                    FOREIGN KEY(artist_id)
                        REFERENCES {ArtistModel.get_table_name()}(artist_id)
                        ON DELETE CASCADE
        );
        """

    @staticmethod
    def get_router() -> APIRouter:
        from modules.post.router import router
        return router
        
    @staticmethod
    def get_create_order() -> int:
        return 5