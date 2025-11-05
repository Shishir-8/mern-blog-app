import Blog from '@/pages/blog/Blog'
import { resetBlogState } from '@/redux/blog/blogSlice'
import { fetchAllBlogs } from '@/redux/blog/blogThunk'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import Loader from '../common/Loader'

export default function SearchList() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const query = new URLSearchParams(location.search).get("q")

    const { blogs, isLoading, isError } = useSelector((state) => state.blog)

    useEffect(() => {
      if(!query) return;
      dispatch(fetchAllBlogs(query))
    }, [query, dispatch])

    if(isLoading) return <Loader />

    return (
        <div className='max-w-7xl mx-auto px-10'>
            <h1 className='mt-5 mb-5 text-2xl font-semibold'>Search Results</h1>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {
                    blogs.length === 0 ? 
                    <div className='p-5'>
                        <h1 className='text-2xl font-semibold'>No results found</h1>
                    </div>
                    :
                        blogs.map((blog) => (
                            <Blog key={blog._id} blog={blog} />
                        ))
                }
            </div>
        </div>
    )
}
