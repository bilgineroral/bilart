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
    return " NATURAL JOIN ".join([model.get_table_name() for model in models])