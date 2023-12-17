import {post, deleteItem} from "./crude.js";

type CreateFavoriteData = {
    post_id: number;
};

export const favorite = async (data: CreateFavoriteData): Promise<void> => {
    await post<CreateFavoriteData, void>(`https://your-api-url.com/favorite`, data);
};


export const unFavorite = async (data: CreateFavoriteData): Promise<void> => {
    await deleteItem(`https://your-api-url.com/favorite`, data);
};
