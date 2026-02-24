const AppError = require("../utils/AppError");
const { successResponse } = require("../utils/response.js");

// const posts = require("../data/mockData.json");

const Post = require("../models/Post.js");

/**
 * GET ALL BLOGS
 * @returns all blogs data
 */
const getAllBlogs = async (req, res) => {
    const data = await Post.find();

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
    const data = await Post.findById(id);

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
    const {excludeId, tripId, excludeTripId, country, regions, years} = req.query;
    
    let data = await Post.find();
    if (regions) data = data.filter(p => regions.includes(p.region));
    if (years) data = data.filter(p => years.includes(p.year));
    if (excludeId) data = data.filter(p => p.id !== Number(excludeId));
    if (tripId) data = data.filter(p => p.tripId === tripId);
    if (excludeTripId) data = data.filter(p => p.tripId !== excludeTripId)
    if (country) data = data.filter(p => p.country === country );

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