import {createSlice, current} from "@reduxjs/toolkit"
import { createBlog, deleteBlog, fetchAllBlogs, fetchSingleBlog, updateBlog } from "./blogThunk"


const initialState  = {
    blogs: [],
    currentBlog: null,
    isLoading : false,
    message: ''
}

const blogSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {
        resetBlogState:  (state) => {
            state.isLoading = false,
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder

        // fetch blogs

        .addCase(fetchAllBlogs.pending, (state) => {
            state.isLoading = true;
        })

        .addCase(fetchAllBlogs.fulfilled, (state, action) => {
            state.isLoading = false
            state.blogs = action.payload
            
        })

         .addCase(fetchAllBlogs.rejected, (state, action) => {
            state.isLoading = false;
            state.message = action.payload
        })

        //fetch single blog

        .addCase(fetchSingleBlog.pending, (state) => {
            state.isLoading = true;
        })

        .addCase(fetchSingleBlog.fulfilled, (state, action) => {
            state.isLoading = false
            state.currentBlog = action.payload
        })

         .addCase(fetchSingleBlog.rejected, (state, action) => {
            state.isLoading = false;
            state.message = action.payload
        })

    // create blogs

        .addCase(createBlog.pending, (state) => {
            state.isLoading = true;
        })

        .addCase(createBlog.fulfilled, (state, action) => {
            state.isLoading = false
            state.blogs.push(action.payload)
        })

         .addCase(createBlog.rejected, (state, action) => {
            state.isLoading = false;
            state.message = action.payload
        })

        // update blogs


        .addCase(updateBlog.pending, (state) => {
            state.isLoading = true;
        })

        .addCase(updateBlog.fulfilled, (state, action) => {
            state.isLoading = false
            state.blogs = state.blogs.map((blog)=> 
                blog._id === action.payload._id ? action.payload : blog
            )
        })

         .addCase(updateBlog.rejected, (state, action) => {
            state.isLoading = false;
            state.message = action.payload
        })

        // delete blogs

        .addCase(deleteBlog.pending, (state) => {
            state.isLoading = true;
        })

        .addCase(deleteBlog.fulfilled, (state, action) => {
            state.isLoading = false
            state.blogs = state.blogs.filter((blog) => blog._id !== action.payload.id)
        })

         .addCase(deleteBlog.rejected, (state, action) => {
            state.isLoading = false;
            state.message = action.payload || "Delete Failed"
        })

    }
})


export const {resetBlogState} = blogSlice.actions
export default blogSlice.reducer