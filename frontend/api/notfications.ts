import {get, post} from "./crude.js";

export const getNotifications = async (): Promise<Notification[]> => {
    return get<Notification[]>(`https://your-api-url.com/notifications`);
};


export const readNotifications = async (): Promise<void> => {
    await post<null, void>(`https://your-api-url.com/notifications`, null);
};
