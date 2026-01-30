const express = require("express");
const router = express.Router();

const asyncWrapper = require("../utils/asyncWrappe.js");
const { response } = require("../utils/response.js");
const { getAllBlogs, getBlogById } = require("../controllers/blogController.js");

/**
 * GET
 */
// ALL BLOGS
router.get('/', asyncWrapper(async(req, res) => {
    const allBlogs = await getAllBlogs();
    response(res, 200, 'success', `All blog fetched successfully`, allBlogs);
}))
// BLOG BY ID
router.get('/:id', asyncWrapper(async(req, res) => {
    const blog = await getBlogById(req.params.id);
    response(res, 200, 'success', `Blog ID: ${req.params.id} fetched successfully`, blog);
}))

module.exports = router