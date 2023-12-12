from typing import Tuple

from fastapi import HTTPException

from db.tables import params_to_where_clause
from db.db import PgDatabase


def get_from_table(table_name: str, where_clasue: str, single: bool = False) -> Tuple[bool, int, str, list[dict]]:
    query = f'SELECT * FROM {table_name} {"" if len(where_clasue) == 0 else f"WHERE {where_clasue}"};'
    print(query)
    with PgDatabase() as db:
        try:
            db.cursor.execute(query)
            data: list[Tuple] = db.cursor.fetchall()
            count = len(data)
            if single:
                if count > 1:
                    raise HTTPException(status_code=400, detail=f"More than one object returned:{count}")
                elif count == 0:
                    print("here")
                    raise HTTPException(status_code=404, detail=f"Object not found")
            columns: list[str] = [desc[0] for desc in db.cursor.description]
            return True, count, "Data retrieved successfully", [dict(zip(columns, row)) for row in data]
        except HTTPException as e:
            raise e
        except Exception as e:
            print(e)
            raise HTTPException(status_code=500, detail=str(e))


def retrieve(table: str, single: bool = False, **kwargs):
    return get_from_table(table, params_to_where_clause(**kwargs), single=single)
