import {get, post, put, deleteItem, toQueryString} from "./crude.js";

export const getMe = async (): Promise<User> => {
    return get<User>(`https://your-api-url.com/users/me`);
};


export const deleteUser = async (): Promise<void> => {
    await deleteItem(`https://your-api-url.com/users/me`, null);
};

type UpdateUserData = {
    username?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    phone?: string;
    bio?: string;
    link?: string;
    privileges?: string;
};


export const updateUser = async (data: UpdateUserData): Promise<User> => {
    return put<UpdateUserData, User>(`https://your-api-url.com/users/me`, data);
};


export const getUserById = async (user_id: number): Promise<User> => {
    return get<User>(`https://your-api-url.com/users/${user_id}`);
};


export const getUserByUsername = async (username: string): Promise<User> => {
    return get<User>(`https://your-api-url.com/users/${encodeURIComponent(username)}`);
};


type UserQueryParams = {
    username?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    bio?: string;
    link?: string;
    privledge?: string;
    rank?: number;
    search__username?: string;
    search__first_name?: string;
    search__last_name?: string;
    search__email?: string;
    search__bio?: string;
    created_at?: string;
};

export const getUsers = async (params: UserQueryParams): Promise<User[]> => {
    const queryString = toQueryString(params);
    return get<User[]>(`https://your-api-url.com/users?${queryString}`);
};


export const createNewUser = async (data: User): Promise<User> => {
    return post<User, User>(`https://your-api-url.com/users/register`, data);
};
