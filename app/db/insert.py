from typing import Any, Tuple

from fastapi import HTTPException

from db.model import Model
from db.db import PgDatabase

# insert data into any table
def insert_data_into_table(table_name: str, data: dict, identifier: str) -> Tuple[bool, str, dict[str, Any]]:
    try:
        query = f"""INSERT INTO {table_name} ({', '.join(data.keys())}) 
            VALUES ({', '.join([f"'{v}'" for v in data.values()])}) RETURNING {identifier}"""
        print(query)
        with PgDatabase() as db:
            # Execute the SQL query with the data values
            db.cursor.execute(query, list(data.values()))
            id = db.cursor.fetchone()[0]
            # Commit the transaction
            db.connection.commit()
            
            select_query = f"SELECT * FROM {table_name} WHERE {identifier} = {id}"
            db.cursor.execute(select_query)
            
            row = db.cursor.fetchone()
            columns: list[str] = [desc[0] for desc in db.cursor.description]
            
            return True, "Data inserted successfully", dict(zip(columns, row))
    except Exception as e:
        import traceback
        traceback.print_exc()
        
        raise HTTPException(status_code=500, detail=str(e))


def insert(model: Model) -> Tuple[bool, str, dict[str, Any]]:
    return insert_data_into_table(model.get_table_name(), model.to_dict(), model.get_identifier())
