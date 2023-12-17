import {get, post, put, deleteItem, toQueryString} from "./crude.js";

type CreateRatingData = {
    score: number;
    comment: string;
    post_id: number;
};

type UpdateRatingData = {
    score?: number;
    comment?: string;
};

export const getRating = async (rating_id: number): Promise<Rating> => {
    return get<Rating>(`https://your-api-url.com/ratings/${rating_id}`);
};


type RatingQueryParams = {
    score?: number;
    gt__score?: number;
    lt__score?: number;
    search__comment?: string;
    post_id?: number;
    collector_id?: number;
};

export const getRatings = async (params: RatingQueryParams): Promise<Rating[]> => {
    const queryString = toQueryString(params);
    return get<Rating[]>(`https://your-api-url.com/ratings?${queryString}`);
};


export const createNewRating = async (data: CreateRatingData): Promise<Rating> => {
    return post<CreateRatingData, Rating>(`https://your-api-url.com/ratings`, data);
};


export const updateRating = async (rating_id: number, data: UpdateRatingData): Promise<Rating> => {
    return put<UpdateRatingData, Rating>(`https://your-api-url.com/ratings/${rating_id}`, data);
};


export const deleteRating = async (rating_id: number): Promise<void> => {
    await deleteItem(`https://your-api-url.com/ratings/${rating_id}`, null);
};