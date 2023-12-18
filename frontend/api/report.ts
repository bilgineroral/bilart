import {get, post, toQueryString} from "./crude";

type CreateReportData = {
    content: string;
    entity_name: string;
    entity_id: number;
};

export const getReport = async (report_id: number): Promise<ApiReuslt<Report>> => {
    return get<Report>(`http://localhost:8000/reports/${report_id}`);
};


type ReportQueryParams = {
    content?: string;
    search__content?: string;
    created_at?: string;
    entity_name?: string;
    entity_id?: number;
    user_id?: number;
};

export const getReports = async (params: ReportQueryParams): Promise<ApiReuslt<Report[]>> => {
    const queryString = toQueryString(params);
    return get<Report[]>(`http://localhost:8000/reports?${queryString}`);
};


export const createReport = async (data: CreateReportData): Promise<ApiReuslt<Report>> => {
    return await post<CreateReportData, Report>(`http://localhost:8000/reports`, data);
};
