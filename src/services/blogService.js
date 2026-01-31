export const getAllBlogs = async () => {
    const res = await fetch("http://localhost:3000/api/blogs");
    const result = await res.json();

    if (result.status === "fail") throw result;
    return result.data;
};

export const getBlogById = async (id) => {
    const res = await fetch(`http://localhost:3000/api/blogs/${id}`);
    const result = await res.json();

    if (result.status === "fail") throw result;
    return result.data;
}


