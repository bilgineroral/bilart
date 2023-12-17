import {get, post, toQueryString} from "./crude.js";

type CreateReportData = {
    content: string;
    entity_name: string;
    entity_id: number;
};

export const getReport = async (report_id: number): Promise<Report> => {
    return get<Report>(`https://your-api-url.com/reports/${report_id}`);
};


type ReportQueryParams = {
    content?: string;
    search__content?: string;
    created_at?: string;
    entity_name?: string;
    entity_id?: number;
    user_id?: number;
};

export const getReports = async (params: ReportQueryParams): Promise<Report[]> => {
    const queryString = toQueryString(params);
    return get<Report[]>(`https://your-api-url.com/reports?${queryString}`);
};


export const createReport = async (data: CreateReportData): Promise<void> => {
    await post<CreateReportData, void>(`https://your-api-url.com/reports`, data);
};
