from typing import Tuple

from app.models import Model
from ..db import PgDatabase

# insert data into any table
def insert_data_into_table(table_name: str, data: dict) -> Tuple[bool, str]:
    try:
        query = f"insert into {table_name} ({', '.join(data.keys())}) values ({', '.join(['%s' for _ in data.values()])})"
        print(query)
        with PgDatabase() as db:
            # Execute the SQL query with the data values
            db.cursor.execute(query, list(data.values()))
            
            # Commit the transaction
            db.connection.commit()
            
            return True, "Data inserted successfully"
    except Exception as e:
        print(e)
        return False, str(e)


def insert(model: Model):
    return insert_data_into_table(model.get_table_name(), model.to_dict())