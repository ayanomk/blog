const AppError = require("../utils/AppError");
const posts = require("../data/posts");

/**
 * GET
 * @returns blog data
 */
const getAllBlogs = async () => {
    // FIXME! switch after connecting to db
    // const data = await posts.findAll();
    const data = posts;

    if (!data || data.length === 0) throw new AppError("No blogs found", 404);

    return data;
};

const getBlogById = async (id) => {
    // FIXME! switch after connecting to db
    // const data = await posts.findById(id);
    const data = posts.find(p => p.id === Number(id));

    if (!data) throw new AppError(`Blog ID: ${id} not found`, 404);

    return data;
};

module.exports = {
    getAllBlogs,
    getBlogById
};