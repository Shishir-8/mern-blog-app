import Loader from '@/components/common/Loader'
import { fetchSingleBlog } from '@/redux/blog/blogThunk'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

export default function BlogDetail() {
    const {id} = useParams()
    const dispatch = useDispatch()


    const {currentBlog, isSuccess, isError, message, isLoading} = useSelector((state) => state.blog)

    useEffect(() => {
        dispatch(fetchSingleBlog(id))
    }, [dispatch, id])

    if(isLoading) {
        return <Loader />
    }

    if(isError) return <Error message={message} />

    

  return (
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      
        <div class="py-8">
            <h1 class="text-3xl font-bold mb-2">{currentBlog?.title}</h1>
            <p class="text-gray-500 text-sm">Published on <time datetime="2022-04-05">April 5, 2022</time></p>
        </div>


        <img src={currentBlog?.postImage} alt=" Image 1"/>

        <div class="prose mt-5 prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto">
           <p>{currentBlog?.content}</p>
        </div>
    </div>
</div>
  )
}
