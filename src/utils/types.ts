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
export interface ProjectApiData {
    totalRecord: number;
    currPage: number;
    recordsPerPage: number;
    pages: number;
    projects: Project[];
}
export interface apiMessage {
    message: string;
}
