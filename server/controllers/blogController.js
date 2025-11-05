import uploadImage from "../config/cloudinary.js";
import Blog from "../models/postModel.js"


export const createBlog = async (req, res) => {
    try {
        const {title, content} = req.body

        let imagePath = "";
        if(req.file) {
            imagePath = await uploadImage(req.file.path, "blogs")
        } 


        if(!title || !content) {
            return res.status(400).json({message: "All fields are required"})
        }
        const blog = await Blog.create({
            title,
            content,
            postImage: imagePath,
            author: req.user._id
        })
        res.status(201).json({
            message: "Blog created succesfully",
            blog
        })
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getAllBlogs = async (req, res) => {
    try {
        const {search} = req.query;
        let query = {}

        if(search) {
            const regex = new RegExp(search, "i")
            query.$or = [{title: regex}, {content: regex}]
        }

        const blogs = await Blog.find(query).sort({createdAt: -1}).populate("author", "name")
       
        if(!blogs) {
            return res.status(404).json({message: "Blogs not found"})
        }
        res.status(200).json({
            message: "Blog sent succesfully",
            blogs
        })
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


export const getBlogById = async (req, res) => {
    try {
        const id = req.params.id
    
        const blog = await Blog.findById(id).populate("author", "name")
      
        if(!blog) return res.status(404).json({message: "Blog not found"})
        
        res.status(200).json({
            message: "Blog sent succesfully",
            blog
        })
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


export const updateBlog = async (req, res) => {
    try {
        const {id} = req.params
    
        const {title, content} = req.body
        const blog = await Blog.findById(id);
        if(!blog) {
            return res.status(404).json({message: "Blog not found"})
        }
        

        if(blog.author.toString() !== req.user._id.toString() && req.user.role !== "admin") {
            return res.status(403).json({message: "Not authorized"})
        }

        if(req.file) {
            const imagePath = await uploadImage(req.file.path)
            blog.postImage = imagePath
        }

        if(title) blog.title = title;
        if(content) blog.content = content

      const updatedBlog = await blog.save()

        res.status(200).json({
            message: "Blog updated succesfully",
            updatedBlog
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const deleteBlog = async (req, res) => {
    try {
        const {id} = req.params
        const blog = await Blog.findById(id)
        if(!blog) {
            return res.status(404).json("Blog not found")
        }

        if(blog.author.toString() !== req.user.id.toString() && req.user.role !== "admin") {
            return res.status(403).json({message: "Not authorized"})
        }

         await Blog.findByIdAndDelete(id)
        res.status(200).json({message: "Deleted succesfully", id})
        
    } catch (error) {
        res.status(500).json({message: error.message})

    }
}