const express = require("express");
const router = express.Router();

const { asyncWrapper } = require("../utils/asyncWrapper.js");
const { getAllBlogs, getBlogById } = require("../controllers/blogController.js");

/**
 * GET
 */
// ALL BLOGS (DRAFT + PUBLISHED)
router.get('/', asyncWrapper(getAllBlogs));
// BLOG BY ID
router.get('/:id', asyncWrapper(getBlogById));

module.exports = router;