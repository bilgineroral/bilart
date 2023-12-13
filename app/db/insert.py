from typing import Any, Tuple

from fastapi import HTTPException

from db.model import Model
from db.db import PgDatabase

from db.retrieve import retrieve

# insert data into any table
def insert_data_into_table(table_name: str, data: dict, identifier: Any) -> Tuple[bool, str, Any]:
    try:
        query = f"""INSERT INTO {table_name} ({', '.join(data.keys())}) 
            VALUES ({', '.join([f"'{v}'" for v in data.values()])}) RETURNING {identifier}"""
        print(query)
        with PgDatabase() as db:
            # Execute the SQL query with the data values
            db.cursor.execute(query, list(data.values()))
            
            # Commit the transaction
            db.connection.commit()
            
            id = db.cursor.fetchone()[0]
            
            return True, "Data inserted successfully", id
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))


def insert(model: Model) -> Tuple[bool, str, dict[str, Any]]:
    result, message, id = insert_data_into_table(model.get_table_name(), model.to_dict(), model.get_identifier())
    
    filters = {
        'tables':[model],
        'single':True,
        f'{model.get_identifier()}':id
    }
    _, _, _, data = retrieve(**filters)
    return result, message, data[0]