import { baseURL } from "./constants";
import { Comment, Credentials, Project, TaskType } from "./types";
export const loginApi = async ({ email, password }: Credentials) => {
    try {
        const res = await fetch(`${baseURL}users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
            credentials: "include",
        });
        return await res.json();
    } catch (error) {
        return error;
    }
};

export const getProjects = async () => {
    try {
        const res = await fetch(`${baseURL}projects/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        return await res.json();
    } catch (error) {
        return error;
    }
};

export const getTasks = async (id: string | number) => {
    try {
        const res = await fetch(`${baseURL}tasks/project/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        return await res.json();
    } catch (error) {
        return error;
    }
};

export const deleteProjectAPI = async (id: number) => {
    try {
        const res = await fetch(`${baseURL}projects/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        return await res.json();
    } catch (error) {
        return error;
    }
};
export const addProjectAPI = async (data: Project) => {
    try {
        const res = await fetch(`${baseURL}projects/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
        });
        return await res.json();
    } catch (error) {
        return error;
    }
};

export const deleteTaskAPI = async (id: number) => {
    try {
        const res = await fetch(`${baseURL}tasks/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        return await res.json();
    } catch (error) {
        return error;
    }
};
export const addTaskAPI = async (data: Partial<TaskType>) => {
    try {
        const res = await fetch(`${baseURL}tasks/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
        });
        return await res.json();
    } catch (error) {
        return error;
    }
};
export const updateTaskAPI = async (data: Partial<TaskType>) => {
    try {
        const res = await fetch(`${baseURL}tasks/${data.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
        });
        return await res.json();
    } catch (error) {
        return error;
    }
};

export const updateProjectAPI = async (data: Project) => {
    try {
        const res = await fetch(`${baseURL}projects/${data.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
        });
        return await res.json();
    } catch (error) {
        return error;
    }
};

export const getComments = async (id: string | number) => {
    try {
        const res = await fetch(`${baseURL}comment/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        return await res.json();
    } catch (error) {
        return error;
    }
};
export const sendCommentAPI = async (data: Comment) => {
    try {
        const res = await fetch(`${baseURL}comment/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
        });
        return await res.json();
    } catch (error) {
        return error;
    }
};
export const deleteCommentAPI = async (id: number) => {
    try {
        const res = await fetch(`${baseURL}comment/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        return await res.json();
    } catch (error) {
        return error;
    }
};

export const updateCommentAPI = async (id: number, content: string) => {
    try {
        const res = await fetch(`${baseURL}comment/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({content}),
            credentials: "include",
        });
        return await res.json();
    } catch (error) {
        return error;
    }
};
