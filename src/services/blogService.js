import { API_BASE } from './apiConfig.js';

/**
 * GET ALL BLOGS
 * @returns if success all blogs data. if fail error?
 */
export const getAllBlogs = async () => {
    const res = await fetch(`${API_BASE}/blogs`);
    const result = await res.json();

    if (result.status === "fail") throw result;
    return result.data;
};

/**
 * GET A SINGLE BLOG BY ID
 * @param {*} id id of blog
 * @returns if success single blog data. if fail error?
 */
export const getBlogById = async (id) => {
    const res = await fetch(`${API_BASE}/blogs/${id}`);
    const result = await res.json();

    if (result.status === "fail") throw result;
    return result.data;
}

/**
 * GET FILTERED BLOGS BY QUERY
 * @returns 
 */
export const getBlogsByFilter = async (query = {}) => {
    const queries = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
        if(Array.isArray(value)) {
            value.forEach((val) => {
                queries.append(key, val);
            });
        } else if (value !== undefined && value !== null) {
            queries.append(key, value);
        }
    });

    const res = await fetch(`${API_BASE}/blogs/filter?${queries.toString()}`);
    const result = await res.json();

    if (result.status === "fail") throw result;
    return result.data;
}

export const createBlog = async (data) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_BASE}/admin/blogs`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: data,
    });

    const result = await res.json();

    if (result.status === "fail") throw result;
    return result.data;
}

export const editBlog = async (id, data) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_BASE}/admin/blogs/${id}/edit`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: data,
    });

    const result = await res.json();

    if (result.status === "fail") throw result;
    return result.data;
}