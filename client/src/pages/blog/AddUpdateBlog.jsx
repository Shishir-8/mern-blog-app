import { resetBlogState } from "@/redux/blog/blogSlice";
import { createBlog, fetchSingleBlog, updateBlog } from "@/redux/blog/blogThunk";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddUpdateBlog() {
    const { id } = useParams()
    // ✅ Single state for all form fields
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        postImage: null,
        existingImage: '', // this is for preview of image in edit mode
    });

    const [validationError, setValidationError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentBlog, isLoading, isError, message } = useSelector(
        (state) => state.blog
    );

    // ✅ Handle input changes
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "file" ? files[0] : value,
        }));
        setValidationError("")
    };

    // ✅ Simple validation
    const validate = () => {
        if (!formData.title.trim() || !formData.content.trim()) {
            setValidationError("Title and Description are required");
            return false;
        }

        setValidationError("");
        return true;
    };

    // ✅ Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            if (id) {
                await dispatch(updateBlog({ id, blogData:formData })).unwrap()
                toast.success("Blog updated succesfully")
                navigate("/")
            } else {
                await dispatch(createBlog(formData)).unwrap()
                toast.success("Post created succesfully")
                navigate("/")
            }
            dispatch(resetBlogState())
        } catch (error) {
            console.log(error)
            setValidationError(error)
        }
    };

    // edit feature
    // if id is present then fetch that single blog which we want to edit

    useEffect(() => {
        if (id) {
            dispatch(fetchSingleBlog(id))
        } else {
            setFormData({
                title: "",
                content: "",
                postImage: null,
                existingImage: ""
            })
            dispatch(resetBlogState())
        }
    }, [id, dispatch])

    // ppopulate that data in edit mode
    useEffect(() => {
        if (currentBlog && id) {
            setFormData({
                title: currentBlog.title,
                content: currentBlog.content,
                existingImage: currentBlog.postImage || ""
            })
        } 

    }, [currentBlog, id])





    return (
        <div>
            <section className="container mx-auto p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    {id ? "Edit Blog": "Create Blog"}
                </h1>

                {/* ✅ Show validation error */}
                {validationError && (
                    <div className="mb-4 max-w-2xl mx-auto border border-red-300 bg-red-50 text-red-700 rounded-lg p-4 text-sm text-center">
                        {validationError}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md"
                >
                    {/* ✅ Title */}
                    <div className="mb-4">
                        <label
                            htmlFor="title"
                            className="block text-gray-700 font-semibold mb-2"
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter blog title"
                        />
                    </div>

                    {/* ✅ File Upload */}
                    <div className="mb-4">
                        <label
                            htmlFor="postImage"
                            className="mb-2 block font-semibold text-gray-700"
                        >
                            Upload Image
                        </label>
                        <input
                            id="postImage"
                            name="postImage"
                            type="file"
                            onChange={handleChange}
                            className="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-blue-600 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-700 focus:outline-none mb-5"
                        />

                        {/* ✅ Optional preview */}

                        {formData.postImage ? (
                            <img
                                src={URL.createObjectURL(formData.postImage)}
                                alt="Preview"
                                className="w-60 h-40 object-cover rounded-md mt-2"
                            />
                        ) : formData.existingImage ? (
                            <img
                                src={formData.existingImage}
                                alt="Existing"
                                className="w-60 h-40 object-cover rounded-md mt-2"
                            />
                        ) : null}

                    </div>

                    {/* ✅ Description */}
                    <div className="mb-4">
                        <label
                            htmlFor="description"
                            className="block text-gray-700 font-semibold mb-2"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            rows={8}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Write your blog content here..."
                        ></textarea>
                    </div>

                    {/* ✅ Submit */}
                    <div className="text-end">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-blue-600 text-white px-6 py-2.5 rounded-md font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {/* This is for create only but in update  if id then update and hanlde loding also */}
                            {/* {isLoading ? "Publishing..": "Publish Post"} */}

                            {
                                isLoading ? "Publishing..." : id ? "Update Post" : "Publish Post"
                            }
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}