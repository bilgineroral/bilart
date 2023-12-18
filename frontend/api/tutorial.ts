import {get, postFormData, put, deleteItem, toQueryString} from "./crude";

export const getTutorial = async (tutorialId: number): Promise<ApiReuslt<Tutorial>> => {
    return get<Tutorial>(`http://localhost:8000/tutorial/${tutorialId}`);
};

export type TutorialQueryParams = {
    media?: string;
    created_at?: string;
    tutorialist_id?: number;
    title?: string;
    description?: string;
    search__title?: string;
    search__description?: string;
    tag_name?: string;
    favoriting_collector?: number;
};

export const getTutorials = async (params: TutorialQueryParams): Promise<ApiReuslt<Tutorial[]>> => {
    const queryString = toQueryString(params);
    return get<Tutorial[]>(`http://localhost:8000/tutorial?${queryString}`);
};

export type NewTutorialData = {
    title: string;
    description: string;
    media: File; // Handle file data appropriately
};

export const createNewTutorial = async (data: NewTutorialData): Promise<ApiReuslt<Tutorial>> => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('media', data.media);

    // Add any other fields to formData as needed
    return await postFormData<Tutorial>(`http://localhost:8000/art`, formData);
};

type UpdateTutorialData = {
    content?: string;
    title?: string;
    description?: string;
};


export const updateTutorial = async (tutorialId: number, data: UpdateTutorialData): Promise<ApiReuslt<Tutorial>> => {
    return put<UpdateTutorialData, Tutorial>(`http://localhost:8000/tutorial/${tutorialId}`, data);
};


export const deleteTutorial = async (tutorialId: number): Promise<ApiReuslt<null>> => {
    return await deleteItem(`http://localhost:8000/tutorial/${tutorialId}`, null);
};


