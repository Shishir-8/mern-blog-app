import Spinner from '@/components/common/Spinner'
import { verifyResetOtp } from '@/redux/auth/authThunk'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, Link, Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function VerifyResetOtp() {
    const [otp, setOtp] = useState("")
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const email = location.state?.email

    const { isLoading } = useSelector((state) => state.auth)

    const handleResetOtp = async (e) => {
        e.preventDefault()
        if (!otp || !email) {
            return <div>Email and OTP missing</div>
        }

        try {
            const res = await dispatch(verifyResetOtp({ email, otp })).unwrap()
            if (res.success) {
                toast.success("OTP verified succcessfully")
                navigate("/change-password", { state: { email } })
            }
        } catch (error) {
            toast.error(error)
        }
    }

    return (
        <div className=' flex justify-center items-center min-h-screen flex-col'>
            <form
                onSubmit={handleResetOtp}
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
