import Loader from '@/components/common/Loader'
import usePageTitle from '@/components/common/useMeta'
import { resetState } from '@/redux/auth/authSlice'
import { registerUser, verifyEmail } from '@/redux/auth/authThunk'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function VerifyEmail() {

    usePageTitle("Verify Email")

    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [otp, setOtp] = useState("")
    const email = location.state?.email

    const { isLoading, isError, message } = useSelector((state) => state.auth)

    const handleVerify = async (e) => {
        e.preventDefault()
        if (!otp) return toast.error("Please enter the OTP")
        try {
            const res = await dispatch(verifyEmail({ email, otp })).unwrap()
            if(!res.user) {
                toast.error("User missing")
                return
            }
            toast.success("Email verified succesfully")
            navigate("/")
        } catch (error) {
            toast.error(error)
        }
    }

    if(isLoading) return <Loader />

    if(!email){
        return (
        <div className="flex items-center justify-center min-h-screen text-red-600">
        <p>Email missing — please sign up again.</p>
      </div>
        )
    }


    return (
        <div className=' flex justify-center items-center min-h-screen flex-col'>
            <form
                onSubmit={handleVerify}
                className='flex flex-col space-y-4 shadow-lg max-w-md w-full p-10'>
                <h1 className='font-semibold text-center text-2xl mb-4'>Verify OTP</h1>
                <p>Enter the OTP sent to your <span className='font-medium'>{email}</span></p>
                <input
                    value={otp}
                    maxLength={6}
                    onChange={(e) => setOtp(e.target.value)}
                    type="text" className='border rounded-md p-2' />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm  font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    {isLoading ? (
                        <>
                            <Spinner />
                        </>
                    ) : (
                        "Verify OTP"
                    )}
                </button>
                <Link className='text-blue-600 cursor-pointer'>Resend OTP</Link>
                <p className='text-sm opacity-80'>OTP expires in 90 seconds</p>
            </form>

        </div>
    )
}
