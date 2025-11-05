import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Menu, Search, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import UserAvatar from "./UserAvatar";
import SearchBar from "../search/SearchBar";
import usePageTitle from "./useMeta";



const Navbar = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false);

  const {user, isLoading, isError, isSuccess} = useSelector((state)=> state.auth)




  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* LEFT: Logo */}
        <Link to="/" className="text-2xl font-bold">
          Blog <span className="text-green-500">App</span>
        </Link>

        <SearchBar />


        {
          user ?
            (
              <div className="hidden md:flex items-center gap-2">

                  <Link className="bg-green-600 hover:bg-green-700 text-white font-medium px-2 py-2 rounded-lg" to="/blogs/create">Create Blog</Link>
              
                <UserAvatar />
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium border rounded-lg 
                       hover:bg-gray-100 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-green-600 text-white font-medium px-3 py-2 rounded-lg">
                  Sign Up
                </Link>
              </div>
            )
        }

        {/* MOBILE MENU ICON */}
        <button
          className="md:hidden p-2 text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="p-4 flex flex-col gap-3">
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 rounded-md border border-gray-300 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Buttons */}
            <div className="flex flex-col gap-2 mt-3">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium border rounded-lg 
                           hover:bg-gray-100 transition text-center"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg 
                           hover:bg-blue-700 transition text-center"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;