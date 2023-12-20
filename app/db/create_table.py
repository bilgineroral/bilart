from typing import Tuple

from fastapi import HTTPException
from db.db import PgDatabase
from modules.modules import create_functions
from modules.modules import create_functions, trigger_functions


def create_tables() -> Tuple[bool, str]:
    commands = "\n".join(create_functions)
    triggers = "\n".join(trigger_functions)
    
    commands = """
    DROP SCHEMA PUBLIC CASCADE;
    CREATE SCHEMA PUBLIC;
    """ + commands
    
    with PgDatabase() as db:
        try:
            print(commands)
            db.cursor.execute(commands)  
            print(triggers)
            db.cursor.execute(triggers)
            
            db.connection.commit()
            return True, "Tables have been created successfully..."
        except Exception as e:
            print(e)
            raise HTTPException(status_code=500, detail=str(e))
