import Loader from '@/components/common/Loader'
import { changePassword, forgetPassword } from '@/redux/auth/authThunk'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function ChangePassword() {
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const email = location.state?.email



    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const {isLoading} = useSelector((state)=> state.auth)

    const handlePasswordChange = async (e)=> {
        e.preventDefault()
        if(!newPassword || !confirmPassword) {
            return setError("Provide credentials")
        }

        if(newPassword.length < 5) {
            return setError("Password must be 6 characters long")
        }

        if(newPassword !== confirmPassword) {
            return setError("Passwords doesn't match")
        }
        setError("")

        if(!email) {
            return setError("Email is missing")
        }

        try {
            const res = await dispatch(changePassword({email,newPassword, confirmPassword})).unwrap()
            if(res.success) {
                toast.success("Password Changed succesfully")
                navigate("/login")
            }
        } catch (error) {
            toast.error("Failed to change password")
        }
    }


  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
        
    <section class="w-full max-w-md">
         {error && (
          <div className="mb-4 border border-red-300 bg-red-50 text-red-700 rounded-lg p-4 text-sm">
            {error}
          </div>
        )}

      <div class="rounded-none bg-white p-8 shadow-sm">
        

        <div class="mb-8 text-center">
          <div class="mb-4 flex justify-center">
            <svg class="h-12 w-12 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
          <h1 class="mb-2 text-2xl font-bold text-black">Reset Password</h1>
          <p class="text-sm text-gray-600">Enter new password to change your password</p>
        </div>


        <form
        onSubmit={handlePasswordChange}
        class="space-y-6">
          <div>
            <label  class="mb-2 block text-sm font-medium text-gray-700">New Password</label>
            <input
            value={newPassword}
            onChange={(e)=> setNewPassword(e.target.value)}
            type="password"  name="newPassword" class="w-full border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-black focus:outline-none" required />
          </div>

            <div>
            <label  class="mb-2 block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
            value={confirmPassword}
            onChange={(e)=> setConfirmPassword(e.target.value)}
            type="password"  name="confirmPassword" class="w-full border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-black focus:outline-none" required />
          </div>

          <button type="submit" class="w-full bg-green-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-green-800">Change Password</button>
        </form>

        <div class="mt-6 text-center">
          <Link to="/login" class="text-sm text-gray-600 transition-colors hover:text-black"> ← Back to Login </Link>
        </div>
      </div>
    </section>
    </div>
  )
}
