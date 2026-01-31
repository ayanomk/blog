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


