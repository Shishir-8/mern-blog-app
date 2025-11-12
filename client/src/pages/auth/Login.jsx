import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resetState } from "../../redux/auth/authSlice";
import Spinner from "../../components/common/Spinner";
import { loginUser} from "../../redux/auth/authThunk";
import GoogleLogin from "./GoogleLogin";
import usePageTitle from "@/components/common/useMeta";
import Loader from "@/components/common/Loader";

export default function Login() {

  usePageTitle("Login")

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [validationError, setValidationError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // ✅ Dynamic input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    setValidationError("")
  };

  // ✅ Basic validation
  const validate = () => {
    if ( !formData.email || !formData.password) {
      setValidationError("All fields are required.");
      return false;
    }

    if (formData.password.length < 5) {
      setValidationError("Password must be at least 5 characters long.");
      return false;
    }
    setValidationError(""); 
    return true;
  };

  const { isLoading, user, message } = useSelector(
    (state) => state.auth
  );

 
  // ✅ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const response = await dispatch(loginUser(formData)).unwrap()
      if(response.success && response.user) {
        toast.success("Login Succesfull")
        navigate("/")
      } 
    } catch (error) {
      toast.error(error?.message || "Login Failed")
    }
  };

  if(isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    )
  }

  return (
    <div className="pt-50 min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto">
        {/* ✅ Only show if non-empty string */}
        {typeof validationError === "string" && validationError.trim().length > 0 && (
          <div className="mb-4 border border-red-300 bg-red-50 text-red-700 rounded-lg p-4 text-sm">
            {validationError}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-xl p-6">
          <div className="mb-5 text-center">
            <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
            <p className="text-gray-600 mt-1 text-sm">
             Login to continue
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
          
              {/* Email */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="your@email.com"
                />
              </div>

              {/* Password */}
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <Link to="/forget-password" className="text-sm text-blue-600">Forget Password?</Link>
              </div>

            
              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {isLoading ? (
                    <>
                      <Spinner /> 
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </div>
            </div>
          </form>

            <div class="border-b text-center mb-3">
                        <div
                            class="leading-none px-2 inline-block text-sm text-gray-400 tracking-wide font-medium bg-white transform translate-y-1/2">
                            Or continue with
                        </div>
                    </div>

          <GoogleLogin />

       
        </div>
      </div>
    </div>
  );
}