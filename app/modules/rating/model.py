from fastapi import APIRouter
from db.model import Model

class RatingModel(Model):
    score: int
    comment: str
    art_id: int
    collector_id: int
    
    @staticmethod
    def get_table_name() -> str:
        return "Rating"
    
    @staticmethod
    def create_table() -> str:
        return f"""
            CREATE TABLE {RatingModel.get_table_name()} (
                rating_id SERIAL PRIMARY KEY,
                score SMALLINT NOT NULL,
                comment VARCHAR(500),
                post_id int NOT NULL,
                collector_id INT NOT NULL,
                CONSTRAINT fk_art
                    FOREIGN KEY(post_id)
                        REFERENCES Post(post_id)
                        ON DELETE CASCADE,
                CONSTRAINT fk_collector
                    FOREIGN KEY(collector_id)
                        REFERENCES Collector(collector_id)
                        ON DELETE CASCADE
            );
            """
            
    @staticmethod
    def get_router() -> APIRouter:
        from modules.rating.router import router
        return router
        
    @staticmethod
    def get_create_order() -> int:
        return 9