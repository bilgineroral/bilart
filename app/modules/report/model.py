from fastapi import APIRouter
from db.model import Model

from modules.user.model import UserModel

class ReportModel(Model):
    @staticmethod
    def get_table_name() -> str:
        return "Report"
    
    @staticmethod
    def create_table() -> str:
        return f"""
            CREATE TABLE {ReportModel.get_table_name()} (
                report_id SERIAL PRIMARY KEY,
                content VARCHAR(256) NOT NULL,
                created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
                entity_name VARCHAR(16) NOT NULL,
                entity_id INT NOT NULL,
                user_id INT NOT NULL,
                CONSTRAINT fk_user
                    FOREIGN KEY(user_id)
                        REFERENCES {UserModel.get_table_name()}(user_id)
                        ON DELETE CASCADE
            );
        """
    
    @staticmethod
    def get_router() -> APIRouter:
        from modules.report.router import router
        return router
        
    @staticmethod
    def get_create_order() -> int:
        return 16