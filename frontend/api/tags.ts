import {get, post, put, deleteItem, toQueryString} from "./crude.js";

type CreateTagData = {
    tag_name: string;
};

export const getTag = async (tag_name: string): Promise<Tag> => {
    return get<Tag>(`https://your-api-url.com/tags/${encodeURIComponent(tag_name)}`);
};


type TagQueryParams = {
    search__tag_name?: string;
};

export const getTags = async (params: TagQueryParams): Promise<Tag[]> => {
    const queryString = toQueryString(params);
    return get<Tag[]>(`https://your-api-url.com/tags?${queryString}`);
};


export const createNewTag = async (data: CreateTagData): Promise<void> => {
    await post<CreateTagData, void>(`https://your-api-url.com/tags`, data);
};


export const deleteTag = async (tag_name: string): Promise<void> => {
    await deleteItem(`https://your-api-url.com/tags/${encodeURIComponent(tag_name)}`, null);
};


type TagPostModel = {
    tag_name: string;
    post_id: number;
};


export const addTagToPost = async (data: TagPostModel): Promise<void> => {
    await post<TagPostModel, void>(`https://your-api-url.com/categorise`, data);
};


export const deleteTagFromPost = async (data: TagPostModel): Promise<void> => {
    await deleteItem(`https://your-api-url.com/categorise`, data);
};
