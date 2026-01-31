import { API_BASE } from './apiConfig.js';

export const getAllBlogs = async () => {
    const res = await fetch(`${API_BASE}/blogs`);
    const result = await res.json();

    if (result.status === "fail") throw result;
    return result.data;
};

export const getBlogById = async (id) => {
    const res = await fetch(`${API_BASE}/blogs/${id}`);
    const result = await res.json();

    if (result.status === "fail") throw result;
    return result.data;
}


