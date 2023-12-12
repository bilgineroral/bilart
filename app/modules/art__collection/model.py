from fastapi import APIRouter
from db.model import Model

from modules.art.model import ArtModel
from modules.collection.model import CollectionModel

class ArtCollectionModel(Model):
    art_id: int
    collection_id: int

    @staticmethod
    def get_table_name() -> str:
        return "Art__Collection"
    
    @staticmethod
    def create_table() -> str:
        return f"""
            CREATE TABLE {ArtCollectionModel.get_table_name()}(
                art_id INT,
                collection_id INT,
                CONSTRAINT fk_art
                    FOREIGN KEY(art_id)
                        REFERENCES {ArtModel.get_table_name()}(art_id)
                        ON DELETE CASCADE,
                CONSTRAINT fk_collection
                    FOREIGN KEY(collection_id)
                        REFERENCES {CollectionModel.get_table_name()}(collection_id)
                        ON DELETE CASCADE,
                CONSTRAINT collection_art_pk PRIMARY KEY(collection_id, art_id)
            );
            """
    
    @staticmethod
    def get_router() -> APIRouter:
        from modules.art__collection.router import router
        return router
        
    @staticmethod
    def get_create_order() -> int:
        return 7