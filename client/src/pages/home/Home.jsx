import React, { useEffect, useState } from 'react'
import Hero from './Hero'
import Blog from '../blog/Blog'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllBlogs } from '@/redux/blog/blogThunk'
import Loader from '@/components/common/Loader'
import usePageTitle from '@/components/common/useMeta'


export default function Home() {
  const dispatch = useDispatch()
  
  usePageTitle("Home")

  const { blogs, isLoading, message } = useSelector((state) => state.blog)

  useEffect(() => {
    dispatch(fetchAllBlogs())
    console.log("Blogs are", blogs)
  }, [dispatch])

  const [currentPage, setCurrentPage] = useState(0)

  const page_size = 6
  const totalBlogs = blogs.length;
  const totalPages = Math.ceil(totalBlogs / page_size)

  const start = currentPage * page_size;
  const end = start + page_size

  const handlePageChange = (n) => {
    setCurrentPage(n)
  }

  const handlePrev = () => {
    setCurrentPage((prev) => prev - 1)
  }

  const handleNext = () => {
    setCurrentPage((prev)=> prev + 1)
  }



  if (isLoading) return <Loader />

  return (
    <div className='px-4'>
      <Hero />

      <section className='max-w-7xl mx-auto relative min-h-screen'>
        <h1 className='text-4xl font-bold underline underline-offset-2 tracking-wider py-5 mb-5'>Latest Blogs</h1>

        {blogs.length === 0 ? <h1 className='text-xl'>No Blogs found</h1> : ""}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center'>


          {blogs.slice(start, end).map((blog) => (
            <Blog key={blog._id} blog={blog} />
          ))}

        </div>
      </section>


        
      <section className='py-20 flex items-center justify-center '>
        <button
        onClick={handlePrev}
        disabled = {currentPage === 0}
        className={`px-4 py-2 border me-2 disabled:opacity-30 transition`}>
          Prev
        </button>

        {[...Array(totalPages).keys().map((n)=> (
          <button
          onClick={()=> handlePageChange(n)}
          className={`px-4 py-2 border me-2 p-2 ${currentPage === n ? "bg-green-600 text-white": "bg-white text-gray-700"}`}>
            {n + 1}
          </button>
        ))]}


        <button
        disabled={currentPage === totalPages - 1}
        onClick={handleNext}
        className='px-4 py-2 border me-2 disabled:opacity-30'>
          Next
        </button>

      </section>

    </div>
  )
}
