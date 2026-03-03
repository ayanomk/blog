const express = require("express");
const router = express.Router();

const { asyncWrapper } = require("../utils/asyncWrapper.js");
const { getAllBlogs, getBlogById, createBlog } = require("../controllers/blogController.js");
const { authenticateUser } = require("../controllers/authenticationController.js"); 

const authenticationHandler = require("../middleware/authenticationHandler.js");

/**
 * LOGIN
 */
router.get('/login', asyncWrapper(authenticateUser));

/**
 * GET
 */
// ALL BLOGS (DRAFT + PUBLISHED)
router.get('/blogs', asyncWrapper(getAllBlogs));
// BLOG BY ID
router.get('/blogs/:id', asyncWrapper(getBlogById));

/**
 * POST
 */
router.post('/blogs', authenticationHandler, asyncWrapper(createBlog));

module.exports = router;