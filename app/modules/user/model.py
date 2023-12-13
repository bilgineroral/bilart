from typing import Any

from fastapi import APIRouter

from db.model import Model


class UserModel(Model):
    username: str
    first_name: str | None = None
    last_name: str | None = None
    email: str
    password: str
    phone: str | None = None

    @staticmethod
    def get_table_name() -> str:
        return '"User"'
    
    def to_dict(self) -> dict[str, Any]:
        data = super().to_dict()
        data['password_hash'] = data.pop('password') # TODO: hash password
        return data
    
    @staticmethod
    def create_table() -> str:
        return f"""
            CREATE TABLE {UserModel.get_table_name()} (
                {UserModel.get_identifier()} SERIAL PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                first_name VARCHAR(255),
                last_name VARCHAR(255),
                email VARCHAR(255) NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                profile_image VARCHAR(255),
                created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
                phone VARCHAR(16)
            );
            """
    
    @staticmethod
    def get_router() -> APIRouter:
        from modules.user.router import router
        return router
        
    @staticmethod
    def get_create_order() -> int:
        return 0
    
    @staticmethod
    def get_identifier() -> str:
        return "user_id"