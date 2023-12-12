from typing import Any
from fastapi import APIRouter
from pydantic import BaseModel
from abc import ABC


class Model(BaseModel, ABC):
    @staticmethod
    def get_table_name() -> str:
        ...
        
    def to_dict(self) -> dict[str, Any]:
        return dict(self)
    
    @staticmethod
    def create_table() -> str:
        ...
        
    @staticmethod
    def get_router() -> APIRouter:
        ...
        
    @staticmethod
    def get_create_order() -> int:
        ...