import { DeleteButton } from "@/components/buttons/DeleteButton";
import usePageTitle from "@/components/common/useMeta";
import { MoveRight } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Blog({ blog }) {

  usePageTitle("Blog Home")
  
  const {user} = useSelector((state) => state.auth)

  const navigate = useNavigate();

  const isAuthor = user && (user.id === blog.author?._id || user.role === "admin") 

  const handleEdit = (id) => {
    navigate(`/blogs/edit/${id}`)
  }

  return (

    <div className="shadow-lg rounded-lg flex flex-col max-w-md w-full bg-white overflow-hidden">
   
      <Link to={`/blogs/${blog._id}`}>
        <img
          src={blog.postImage}
          alt={blog.title}
          className="rounded-t-lg cursor-pointer w-full h-52 object-cover"
        />
      </Link>

  
      <div className="flex flex-col flex-1 px-4 py-4">
    
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span>{blog.author?.name || "Unknown Author"}</span>
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>

   
        <h3 className="text-xl font-semibold text-black mb-2 hover:text-gray-700 transition-colors line-clamp-2">
          {blog.title}
        </h3>


        <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3 flex-grow">
          {blog.content}
        </p>

      
        <div className="mt-auto pt-3 flex items-center justify-between">
          <button
            onClick={() => navigate(`/blogs/${blog._id}`)}
            className="px-4 py-2 rounded-lg border text-sm font-medium transition flex items-center gap-1"
          >
            <span>Read More</span>
            <MoveRight size={16} />
          </button>

          <div className="flex items-center">
            {
                isAuthor && (
                    <>
                    <button
                    onClick={()=> handleEdit(blog._id)}
                    className="px-2 py-2 cursor-pointer border border-green-600 rounded-lg text-sm me-2">Edit</button>

                    <DeleteButton blogId={blog._id} />
                    </>
                )
            }
          </div>
        </div>
      </div>
    </div>
  );
}