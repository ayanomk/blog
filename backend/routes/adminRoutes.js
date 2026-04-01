const express = require("express");
const router = express.Router();

const { asyncWrapper } = require("../utils/asyncWrapper.js");
const { getAllBlogs, getBlogById, createBlog, patchBlog } = require("../controllers/blogController.js");
const { authenticateUser } = require("../controllers/authenticationController.js"); 

const authenticationHandler = require("../middleware/authenticationHandler.js");

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * LOGIN
 */
router.post('/login', asyncWrapper(authenticateUser));

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
router.post('/blogs', authenticationHandler, upload.array('images'), asyncWrapper(createBlog));
/**
 * PATCH
 */
router.patch('/blogs/:id/edit', authenticationHandler, upload.array('images'), asyncWrapper(patchBlog));

module.exports = router;