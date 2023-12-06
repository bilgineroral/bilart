from typing import Tuple

from ..db import PgDatabase

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
            print(e)
            return False, str(e)


def delete(table: str, **kwargs):
    return delete_data_from_table(table, **kwargs)