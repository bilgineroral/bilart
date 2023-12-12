from typing import Tuple

from fastapi import HTTPException

from db.model import Model
from db.db import PgDatabase

# insert data into any table
def insert_data_into_table(table_name: str, data: dict) -> Tuple[bool, str]:
    try:
        query = f"""INSERT INTO {table_name} ({', '.join(data.keys())}) VALUES ({', '.join([f"'{v}'" for v in data.values()])})"""
        print(query)
        with PgDatabase() as db:
            # Execute the SQL query with the data values
            db.cursor.execute(query, list(data.values()))
            
            # Commit the transaction
            db.connection.commit()
            
            return True, "Data inserted successfully"
    except HTTPException as e:
            raise e
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))


def insert(model: Model):
    return insert_data_into_table(model.get_table_name(), model.to_dict())