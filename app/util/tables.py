from enum import Enum

class Tables(Enum):
    User = '"User"'
    Collector = 'Collector'
    Artist = 'Artist'
    Admin = 'Admin'
    Art = 'Art'
    Collection = 'Collection'
    Rating = 'Rating'
    Tag = 'Tag'
    Auction = 'Auction'
    Tag__Auction = 'Tag_JUNCTION_Art'
    Bid = 'Bid'
    
def params_to_where_clause(**kwargs):
    return " and ".join([f"""{k} = {f"'{v}'"}""" for k, v in kwargs.items() if v is not None])