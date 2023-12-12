from typing import Tuple

from fastapi import HTTPException
from db.tables import params_to_where_clause

from db.db import PgDatabase

# insert data into any table
def delete_data_from_table(table_name: str, **kwargs) -> Tuple[bool, str]:
    print(kwargs)
    query = f"""DELETE FROM {table_name} WHERE {params_to_where_clause(**kwargs)};"""
    print(query)
    with PgDatabase() as db:
        try:
            db.cursor.execute(query, [v for v in kwargs.values() if v is not None])
            deleted_rows = db.cursor.rowcount
            if deleted_rows == 0:
                raise HTTPException(status_code=404, detail="Not found")
            db.connection.commit()
            return True, f"{deleted_rows} row(s) deleted successfully"
        except HTTPException as e:
            raise e
        except Exception as e:
            print(e)
            raise HTTPException(status_code=500, detail=str(e))


def delete(table: str, **kwargs):
    return delete_data_from_table(table, **kwargs)