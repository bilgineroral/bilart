from typing import Tuple

from fastapi import HTTPException
from db.model import ModelProtocal

from db.tables import natural_join_models, params_to_where_clause
from db.db import PgDatabase


def get_from_table(
    tables: str, 
    where_clasue: str, 
    order_by_clasue: str, 
    single: bool = False
) -> Tuple[bool, int, str, list[dict]]:
    
    where = "" if len(where_clasue) == 0 else f"WHERE {where_clasue}"
    order_by = "" if len(order_by_clasue) == 0 else f"ORDER BY {order_by_clasue}"
    query = f'SELECT * FROM {tables} {where} {order_by};'
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


def retrieve(tables: list[ModelProtocal], single: bool = False, order_by: list[str] = [],**kwargs):
    return get_from_table(
        natural_join_models(tables), 
        params_to_where_clause(**kwargs), 
        " ".join(order_by),
        single=single
    )