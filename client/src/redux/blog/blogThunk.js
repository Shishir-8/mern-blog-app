import api from "@/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchAllBlogs = createAsyncThunk("blogs/fetchAllBlogs",
    async(search="", {rejectWithValue}) => {
        try {
           
            const url = search ?
            `/blogs?search=${encodeURIComponent(search)}` :
            `/blogs`

            const res = await api.get(url)
            return res.data.blogs
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)

export const fetchSingleBlog = createAsyncThunk("blogs/fetchSingleBlog",
    async(id, {rejectWithValue}) => {
        try {
            const res = await api.get(`/blogs/${id}`)
            return res.data.blog
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)


export const createBlog = createAsyncThunk("blogs/createBlog",
    async(blogData, {rejectWithValue}) => {
        try {
            const data = new FormData()

            data.append("title", blogData.title);
            data.append("content", blogData.content)

            if(blogData.postImage) {
                data.append("postImage", blogData.postImage)
            }

            const res = await api.post("/blogs", data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            return res.data.blog
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)



export const deleteBlog = createAsyncThunk("blogs/deleteBlog",
    async(id, {rejectWithValue}) => {
        try {
           const res = await api.delete(`/blogs/${id}`)
           return res.data
           
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)



export const updateBlog = createAsyncThunk("blogs/updateblog",
    async({id, blogData}, {rejectWithValue}) => {
        try {

            const data = new FormData()
            if(blogData?.title) data.append("title", blogData.title);
            if(blogData?.content) data.append("content", blogData.content)


            if(blogData?.postImage) {
                data.append("postImage", blogData.postImage)
            }

            const res = await api.put(`/blogs/${id}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            return res.data.updatedBlog
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)
