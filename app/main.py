from fastapi import FastAPI

from db.create_table import create_tables as util_create_tables
from modules.modules import routers


app = FastAPI()

for router in routers:
    app.include_router(router)

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/create_tables")
def create_tables():
    result, message = util_create_tables()
    print(message)
    return {"result": result, "message": message}

