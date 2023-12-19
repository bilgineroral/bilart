import {get, postFormData, put, deleteItem, toQueryString} from "./crude";
import type {Art, ApiReuslt} from "./api_types";

export const getArt = async (artId: number): Promise<ApiReuslt<Art>> => {
    return get<Art>(`http://localhost:8000/arts/${artId}`);
};

export type ArtQueryParams = {
    content?: string;
    created_at?: string;
    artist_id?: number;
    title?: string;
    description?: string;
    search__title?: string;
    search__description?: string;
    collector_id?: number;
    tag_name?: string;
    collection?: number;
    favoriting_collector?: number;
    date_order?: "asc" | "desc";
    price_order?: "asc" | "desc";
};

export const getArts = async (params: ArtQueryParams): Promise<ApiReuslt<Art[]>> => {
    const queryString = toQueryString(params);
    return get<Art[]>(`http://localhost:8000/arts?${queryString}`);
};

export type NewArtData = {
    title: string;
    description: string;
    price: number;
    image: Blob; // Handle file data appropriately
};

export const createNewArt = async (data: NewArtData): Promise<ApiReuslt<Art>> => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('price', data.price.toString());
    formData.append('image', data.image);

    // Add any other fields to formData as needed

    return await postFormData<Art>(`http://localhost:8000/arts`, formData);
};

type UpdateArtData = {
    content?: string;
    title?: string;
    description?: string;
};


export const updateArt = async (artId: number, data: UpdateArtData): Promise<ApiReuslt<Art>> => {
    return put<UpdateArtData, Art>(`http://localhost:8000/arts/${artId}`, data);
};


export const deleteArt = async (artId: number): Promise<ApiReuslt<null>> => {
    return await deleteItem(`http://localhost:8000/arts/${artId}`, null);
};


