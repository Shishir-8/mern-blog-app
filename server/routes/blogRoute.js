import express from "express"
import { createBlog, deleteBlog, getAllBlogs, getBlogById, updateBlog } from "../controllers/blogController.js"
import { isAuthenticated } from "../middlewares/authMiddleware.js"
import upload from "../config/multer.js"

const router = express.Router()

router.get("/", getAllBlogs)
router.get("/:id", getBlogById)

router.post("/", isAuthenticated, upload.single("postImage"), createBlog)
router.put("/:id", isAuthenticated, upload.single("postImage"), updateBlog )

router.delete("/:id", isAuthenticated, deleteBlog)



export default router