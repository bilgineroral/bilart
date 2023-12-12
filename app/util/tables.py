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
    params = []
    
    for k, v in kwargs.items():
        if v is None: continue
        if "search__" in k:
            k = k.replace("search__", "")
            params.append(f"{k} LIKE '%{v}%'")
        elif "gt__" in k:
            k = k.replace("gt__", "")
            params.append(f"{k} > '%{v}%'")
        elif "lt__" in k:
            k = k.replace("lt__", "")
            params.append(f"{k} < '%{v}%'")
        else:
            params.append(f"{k} = '{v}'")
    
    return " and ".join(params)