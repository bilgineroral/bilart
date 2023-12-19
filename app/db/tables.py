from db.model import ModelProtocal


def params_to_where_clause(**kwargs):
    params = []
    search_params = []
    
    for k, v in kwargs.items():
        if v is None: continue
        
        if "table__" in k:
            splited = k.split("__")
            table_name = splited[1]
            k = f"{table_name}.{'__'.join(splited[2:])}"
            
        if "search__" in k:
            k = k.replace("search__", "")
            search_params.append(f"{k} LIKE '%{v}%'")
        elif "gt__" in k:
            k = k.replace("gt__", "")
            params.append(f"{k} > '{v}'")
        elif "lt__" in k:
            k = k.replace("lt__", "")
            params.append(f"{k} < '{v}'")
        else:
            params.append(f"{k} = '{v}'")
    
    if search_params:
        params.append(f'({" OR ".join(search_params)})')
    
    return " AND ".join(params)


def natural_join_models(models: list[ModelProtocal]) -> str:
    return " NATURAL JOIN ".join([model.get_table_name() for model in models if model is not None])


class JoinModel:
    def __init__(self, model: ModelProtocal, on: str, join_type: str = "INNER JOIN") -> None:
        self.model = model
        self.on = on
        self.join_type = join_type
    
    

def join_models(models: list[JoinModel]) -> str:
    if not models:
        return ""
    
    result = f"{models[0].model.get_table_name()}"
    
    for i in range(1, len(models)):
        prev = models[i-1]
        curr = models[i]
        result += f" {prev.join_type} {curr.model.get_table_name()} ON {prev.model.get_table_name()}.{prev.on} = {curr.model.get_table_name()}.{prev.on}"
    
    return result