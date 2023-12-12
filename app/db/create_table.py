from typing import Tuple

from fastapi import HTTPException
from db.db import PgDatabase
from modules.modules import create_functions


def create_tables() -> Tuple[bool, str]:
    commands = "\n".join(create_functions)
    
    with PgDatabase() as db:
        try:
            db.cursor.execute(commands)
            db.connection.commit()
            return True, "Tables have been created successfully..."
        except Exception as e:
            print(e)
            raise HTTPException(status_code=500, detail=str(e))
