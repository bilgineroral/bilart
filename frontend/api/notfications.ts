import {get, post} from "./crude";

export const getNotifications = async (): Promise<ApiReuslt<Notification[]>> => {
    return get<Notification[]>(`http://localhost:8000/notifications`);
};


export const readNotifications = async (): Promise<ApiReuslt<Notification[]>> => {
    return await post<null, Notification[]>(`http://localhost:8000/notifications`, null);
};
