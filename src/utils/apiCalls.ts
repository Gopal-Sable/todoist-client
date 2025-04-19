import { baseURL } from "./constants";
import { Credentials } from "./types";
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
