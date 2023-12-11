from typing import Tuple

from fastapi import HTTPException

from db import PgDatabase

# insert data into any table
def delete_data_from_table(table_name: str, **kwargs) -> Tuple[bool, str]:
    query = f"""DELETE FROM {table_name} WHERE {" and ".join([f'{k} = %s' for k, v in kwargs.items() if v is not None])};"""
    print(query)
    with PgDatabase() as db:
        try:
            db.cursor.execute(query, [v for v in kwargs.values() if v is not None])
            deleted_rows = db.cursor.rowcount
            db.connection.commit()
            return True, f"{deleted_rows} row(s) deleted successfully"
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e.with_traceback))


def delete(table: str, **kwargs):
    return delete_data_from_table(table, **kwargs)