import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import BlogDetail from "../pages/blog/BlogDetail";
import AddUpdateBlog from "@/pages/blog/AddUpdateBlog";
import SearchList from "@/components/search/SearchList";
import VerifyEmail from "@/pages/auth/VerifyEmail";
import ForgetPassword from "@/pages/auth/ForgetPassword";
import VerifyResetOtp from "@/pages/auth/VerifyResetOtp";
import ChangePassword from "@/pages/auth/ChangePassword";



const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <Home /> },
            {path: "/search", element: <SearchList />},
            { path: "/login", element: <Login /> },
            {path:"/forget-password", element:<ForgetPassword />},
            {path: "/verify-reset-otp", element: <VerifyResetOtp />},
            {path:"/change-password", element: <ChangePassword />},
            { path: "/signup", element: <Signup /> },
            {path:"/verify-email", element: <VerifyEmail />},
            { path: "/blogs/:id", element: <BlogDetail /> },
            { path: "blogs/create", element: <AddUpdateBlog /> },
            { path: "blogs/edit/:id", element: <AddUpdateBlog /> }
        ]
    },


])

export default router