import { post, deleteItem } from "./crude";

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
