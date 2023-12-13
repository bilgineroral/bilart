from typing import Tuple

from fastapi import HTTPException
from db.db import PgDatabase
from modules.modules import create_functions
from modules.art.model import ArtModel
from modules.art__collection.model import ArtCollectionModel
from modules.collection.model import CollectionModel
from modules.post.model import PostModel
from modules.tag__post.model import TagPostModel


def create_tables() -> Tuple[bool, str]:
    commands = "\n".join(create_functions)
    print(commands)
    
    with PgDatabase() as db:
        try:
            db.cursor.execute(commands)
            collection_view_query = f"""
                            CREATE VIEW collection_view AS
                            SELECT * FROM {CollectionModel.get_table_name()} c, 
                            {ArtCollectionModel.get_table_name()} ca, 
                            {ArtModel.get_table_name()}, {PostModel.get_table_name()} p, 
                            {TagPostModel.get_table_name()} tp, 
                            WHERE c.collection_id = ca.collection_id AND ca.art_id = a.art_id AND a.post_id = p.post_id AND
                            p.post_id = ta.post_id"""
                            # tag_name = {tag} AND c.collector_id = {collector_id}
            db.cursor.execute(collection_view_query)
            db.connection.commit()
            return True, "Tables have been created successfully..."
        except Exception as e:
            print(e)
            raise HTTPException(status_code=500, detail=str(e))
