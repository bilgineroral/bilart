import {get, post, put, deleteItem, toQueryString} from "./crude.js";

export const getCollection = async (collection_id: number): Promise<Collection> => {
    return get<Collection>(`https://your-api-url.com/collections/${collection_id}`);
};

type CollectionQueryParams = {
    name?: string;
    search__name?: string;
    collector_id?: number;
};

export const getCollections = async (params: CollectionQueryParams): Promise<Collection[]> => {
    const queryString = toQueryString(params);
    return get<Collection[]>(`https://your-api-url.com/collections?${queryString}`);
};

type CreateCollectionData = {
    name: string;
};

export const createNewCollection = async (data: CreateCollectionData): Promise<Collection> => {
    return post<CreateCollectionData, Collection>(`https://your-api-url.com/collections`, data);
};


export const updateCollection = async (collection_id: number, data: CreateCollectionData): Promise<Collection> => {
    return put<CreateCollectionData, Collection>(`https://your-api-url.com/collections/${collection_id}`, data);
};


export const deleteCollection = async (collection_id: number): Promise<void> => {
    await deleteItem<null>(`https://your-api-url.com/collections/${collection_id}`, null);
};

type ArtCollection = {
    art_id: number;
    collection_id: number;
}

export const addToCollection = async (data: ArtCollection): Promise<void> => {
    return post<ArtCollection, void>(`https://your-api-url.com/collect`, data);
}

export const deleteFromCollection = async (data: ArtCollection): Promise<void> => {
    return deleteItem<ArtCollection>(`https://your-api-url.com/collect`, data);
}