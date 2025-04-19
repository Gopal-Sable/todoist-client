export interface Credentials {
    email: string;
    password: string;
}
export interface Project {
    id: number | string;
    name: string;
    color: string;
    is_favorite: 0 | 1;
    user_id?: number;
}
export interface BaseApiData {
    totalRecord: number;
    currPage: number;
    recordsPerPage: number;
    pages: number;
}

export type ApiResponse<T, K extends string> = BaseApiData & {
    [P in K]: T;
};
export interface apiMessage {
    message: string;
}

export interface TaskType {
    id: number;
    content: string;
    description: String;
    due_date: string;
    is_completed: 0 | 1;
    created_at: string;
    project_id: number;
}
