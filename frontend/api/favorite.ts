import { post, deleteItem, get } from "./crude";
import type {ApiReuslt} from "./api_types";

type CreateFavoriteData = {
  post_id: number;
};

export const favorite = async (
  data: CreateFavoriteData
): Promise<ApiReuslt<CreateFavoriteData>> => {
  return await post<CreateFavoriteData, CreateFavoriteData>(
    `http://localhost:8000/favorite`,
    data
  );
};

export const unFavorite = async (
  data: CreateFavoriteData
): Promise<ApiReuslt<CreateFavoriteData>> => {
  return await deleteItem(`http://localhost:8000/favorite`, data);
};

export type FavoritePost = {
  post_id: number;
  collector_id: number;
  artist_id: number;
  created_at: string;
  title: string;
  description: string;
}

export const getFavoritePosts = async(): Promise<ApiReuslt<FavoritePost[]>> => {
  return await get<FavoritePost[]>("http://localhost:8000/favorite");
}