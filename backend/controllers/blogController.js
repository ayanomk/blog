const AppError = require("../utils/AppError");
const { successResponse } = require("../utils/response.js");

const posts = require("../data/mockData.json");

/**
 * GET
 * @returns blog data
 */
const getAllBlogs = async (req, res) => {
    // FIXME! switch after connecting to db
    // const data = await posts.findAll();
    const data = posts;

    // fail
    if (!data || data.length === 0) throw new AppError("No blogs found", 404);
    // success
    successResponse(res, `All blog fetched successfully`, data);
};

const getBlogById = async (req, res) => {
    const id = req.params.id;
    // FIXME! switch after connecting to db
    // const data = await posts.findById(id);
    const data = posts.find(p => p.id === Number(id));

    // fail
    if (!data) throw new AppError(`Blog ID: ${id} not found`, 404);
    // success
    successResponse(res, `Blog ID: ${id} fetched successfully`, data);
};

module.exports = {
    getAllBlogs,
    getBlogById
};