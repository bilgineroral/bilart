from enum import Enum

class Tables(Enum):
    User = '"User"'
    Collector = 'Collector'
    Artist = 'Artist'
    Admin = 'Admin'
    Post = 'Post'
    Art = 'Art'
    Tutorial = 'Tutorial'
    Collection = 'Collection'
    Art__Collection = 'Art_JUNCTION__Collection'
    Favorites = 'Favorites'
    Rating = 'Rating'
    Tag = 'Tag'
    Auction = 'Auction'
    Report = 'Report'
    Notification = 'Notification'
    Tag__Post = 'Tag_JUNCTION_Post'
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