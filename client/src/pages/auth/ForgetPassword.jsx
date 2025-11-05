import Loader from '@/components/common/Loader'
import { forgetPassword } from '@/redux/auth/authThunk'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '@/components/common/Spinner'

export default function ForgetPassword() {
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isLoading } = useSelector((state) => state.auth)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!email) {
            setError("Please enter your email")
            return
        }

        try {
            const res = await dispatch(forgetPassword({email})).unwrap()
            if(res.success) {
                toast.success("Reset OTP sent successfully")
                navigate("/verify-reset-otp", {state: {email}})
            }
        } catch (error) {
           toast.error("Failed to send OTP")
        }
    }

  


    return (
        <div className='flex items-center justify-center min-h-screen'>
            <section class="w-full max-w-md">

                {error && (
                    <div className="bg-red-50 border mb-2 border-red-300 text-red-700 rounded p-3 text-sm">
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
                        <h1 class="mb-2 text-2xl font-bold text-black">Forgot Password</h1>
                        <p class="text-sm text-gray-600">Enter your email address and we'll send you OTP to reset your password.</p>
                    </div>


                    <form
                        onSubmit={handleSubmit}
                        class="space-y-6">
                        <div>
                            <label for="email" class="mb-2 block text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email" id="email" name="email" class="w-full border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-black focus:outline-none" placeholder="your.email@example.com" required />
                        </div>

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
                                "Send Reset OTP"
                            )}
                        </button>
                    </form>

                    <div class="mt-6 text-center">
                        <Link to="/login" class="text-sm text-gray-600 transition-colors hover:text-black"> ← Back to Login </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
