from typing import Tuple

from app.models import Model

from ..db import PgDatabase

# insert data into any table


def update_data_in_table(table_name: str, data: dict, **kwargs) -> Tuple[bool, str]:
    query = f"""UPDATE {table_name} SET {", ".join([f'{k} = %s' for k, v in data.items() if v is not None])} 
        WHERE {" and ".join([f'{k} = %s' for k, v in kwargs.items() if v is not None])};"""
    print(query)
    with PgDatabase() as db:
        try:
            db.cursor.execute(query, [v for v in data.values(
            ) if v is not None] + [v for v in kwargs.values() if v is not None])
            updated_rows = db.cursor.rowcount
            db.connection.commit()
            return True, f"{updated_rows} row(s) updated successfully"
        except Exception as e:
            print(e)
            return False, str(e)


def update(table: str, model: Model, **kwargs):
    return update_data_in_table(table, model.to_dict(), **kwargs)
