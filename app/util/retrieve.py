from typing import Tuple

from app.util.tables import params_to_where_clause
from ..db import PgDatabase


def get_from_table(table_name: str, where_clasue: str) -> Tuple[bool, str, list[dict] | None]:
    query = f'SELECT * FROM {table_name} {"" if len(where_clasue) == 0 else f"WHERE {where_clasue}"};'
    print(query)
    with PgDatabase() as db:
        try:
            db.cursor.execute(query)
            data: list[Tuple] = db.cursor.fetchall()
            columns: list[str] = [desc[0] for desc in db.cursor.description]
            return True, "Data retrieved successfully", [dict(zip(columns, row)) for row in data]
        except Exception as e:
            print(e)
            return False, str(e), None


def retrieve(table: str, **kwargs):
    return get_from_table(table, params_to_where_clause(**kwargs))
