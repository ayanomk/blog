const AppError = require("../utils/AppError");
const { successResponse } = require("../utils/response.js");

const posts = require("../data/mockData.json");

/**
 * GET ALL BLOGS
 * @returns all blogs data
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

/**
 * GET SINGLE BLOG DATA BY ID
 * @param {*} req params.id of blog
 * @param {*} res 
 * @returns single blog data
 */
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

/**
 * GET FILTERED BLOGS BY QUERY
 * @param {*} req query
 * @param {*} res 
 * @returns filtered (multiple) blog data 
 */
const getBlogsByFilter = async (req, res) => {
    const {excludeId, tripId, country, region} = req.query;

    let data;
    if (country) {
        data = posts.filter(p => p.country === country && p.id !== Number(excludeId) && p.tripId !== tripId)
    } else {
        data = posts.filter(p => p.tripId === tripId && p.id !== Number(excludeId));
    };

    // fail
    if (!data || data.length === 0) throw new AppError("No blogs found", 404);
    // success
    successResponse(res, `All blog fetched successfully`, data);
}

module.exports = {
    getAllBlogs,
    getBlogById,
    getBlogsByFilter
};