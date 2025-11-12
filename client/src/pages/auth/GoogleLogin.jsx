import Loader from '@/components/common/Loader'
import Spinner from '@/components/common/Spinner'
import { auth, googleProvider } from '@/firebase'
import { googleLogin } from '@/redux/auth/authThunk'
import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function GoogleLogin() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user, isLoading, message} = useSelector((state) => state.auth)

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const token = await result.user.getIdToken()
      console.log("Firebase Token", token)
      const res = await dispatch(googleLogin(token)).unwrap()
      if(res.success) {
        toast.success("Login Successfull")
        navigate("/")
      }

    } catch (error) {
      toast.error("Google Login Failed")
    }
  }

    if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
       <button
       onClick={handleGoogleLogin}
       class="w-full mt-4 border border-gray-300 py-2 rounded-lg flex items-center justify-center hover:bg-gray-100 transition">
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              class="w-5 h-5 mr-2"
            />
            Sign-up with Google
          </button>
  )
}
