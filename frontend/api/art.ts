import {get, postFormData, put, deleteItem, toQueryString} from "./crude.js";

export const getArt = async (artId: number): Promise<Art> => {
    return get<Art>(`https://your-api-url.com/art/${artId}`);
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
};

export const getArts = async (params: ArtQueryParams): Promise<Art[]> => {
    const queryString = toQueryString(params);
    return get<Art[]>(`https://your-api-url.com/art?${queryString}`);
};

export type NewArtData = {
    title: string;
    description: string;
    price: number;
    image: Blob; // Handle file data appropriately
};

export const createNewArt = async (data: NewArtData): Promise<Art> => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('price', data.price.toString());
    formData.append('image', data.image);

    // Add any other fields to formData as needed

    return await postFormData<Art>(`https://your-api-url.com/art`, formData);
};

type UpdateArtData = {
    content?: string;
    title?: string;
    description?: string;
};


export const updateArt = async (artId: number, data: UpdateArtData): Promise<Art> => {
    return put<UpdateArtData, Art>(`https://your-api-url.com/art/${artId}`, data);
};


export const deleteArt = async (artId: number): Promise<void> => {
    await deleteItem(`https://your-api-url.com/art/${artId}`, null);
};


