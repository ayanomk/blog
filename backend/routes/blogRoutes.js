const express = require("express");
const router = express.Router();

const { asyncWrapper } = require("../utils/asyncWrapper.js");
const { getAllBlogs, getBlogById, getBlogsByFilter } = require("../controllers/blogController.js");

/**
 * GET
 */
// ALL BLOGS
router.get('/', asyncWrapper(getAllBlogs));
// BLOG BY FILTER
router.get('/filter', asyncWrapper(getBlogsByFilter));
// BLOG BY ID
router.get('/:id', asyncWrapper(getBlogById));

module.exports = router;