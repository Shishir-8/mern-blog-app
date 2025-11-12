import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resetState } from "../../redux/auth/authSlice";
import Spinner from "../../components/common/Spinner";
import { registerUser } from "../../redux/auth/authThunk";
import GoogleLogin from "./GoogleLogin";
import usePageTitle from "@/components/common/useMeta";
import Loader from "@/components/common/Loader";

export default function Signup() {

  usePageTitle("Sign Up")

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [validationError, setValidationError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // ✅ Dynamic input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationError('')
  };

  // ✅ Basic validation
  const validate = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setValidationError("All fields are required.");
      return false;
    }

    if (formData.password.length < 5) {
      setValidationError("Password must be at least 5 characters long.");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setValidationError("Passwords do not match.");
      return false;
    }

    setValidationError(""); // Clear previous errors
    return true;
  };

  const { isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  // ✅ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await dispatch(registerUser(formData)).unwrap()
      toast.success("OTP sent to your email!")
      navigate("/verify-email", {state: {email: formData.email}})
    } catch (error) {
      console.log(error)
      setValidationError(error)
    }
  };


    if(isLoading) {
      return (
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      )
    }

  if(isError & message) return <Error message={message} />


  return (
    <div className="pt-40">
      <div className="w-full max-w-md mx-auto">
        {/* ✅ Only show if non-empty string */}
        {typeof validationError === "string" && validationError.trim().length > 0 && (
          <div className="mb-4 border border-red-300 bg-red-50 text-red-700 rounded-lg p-4 text-sm">
            {validationError}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-xl p-6">
          <div className="mb-5 text-center">
            <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
            <p className="text-gray-600 mt-1 text-sm">
              Join us and start sharing your thoughts!
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
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
              <div>
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

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                />
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
                    "Sign Up"
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