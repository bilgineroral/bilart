from fastapi import APIRouter

from db.model import Model
from modules.user.model import UserModel

class AdminModel(Model):
    user_id: int
    privileges: str

    @staticmethod
    def get_table_name() -> str:
        return "Admin"
    
    @staticmethod
    def create_table() -> str:
        return f"""
            CREATE TABLE {AdminModel.get_table_name()} (
                admin_id SERIAL PRIMARY KEY,
                privileges VARCHAR(1),
                user_id INT UNIQUE NOT NULL,
                FOREIGN KEY (user_id) REFERENCES {UserModel.get_table_name()}(user_id)
            );
            """
            
    @staticmethod
    def get_router() -> APIRouter:
        from modules.admin.router import router
        return router
        
    @staticmethod
    def get_create_order() -> int:
        return 3