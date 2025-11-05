import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axios";



export const googleLogin = createAsyncThunk("auth/googleLogin", 
    async (firebaseToken, {rejectWithValue}) => {
        try {
            const res = await api.post("/auth/google-login", {},
            {
                headers: {
                    Authorization: `Bearer ${firebaseToken}`,
                    "Content-Type": "application/json"
                }
            })
            return res.data
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return rejectWithValue(message)
        }
    } 
)

export const registerUser = createAsyncThunk("auth/registerUser", 
    async (userData, {rejectWithValue}) => {
        try {
            const res = await api.post("/auth/register", userData)
            return res.data
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return rejectWithValue(message)
        }
    } 
)


export const verifyEmail = createAsyncThunk("auth/verifyEmail", 
    async (userData, {rejectWithValue}) => {
        try {
            const res = await api.post("/auth/verify-email", userData)
            return res.data
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return rejectWithValue(message)
        }
    } 
)



export const loginUser = createAsyncThunk("auth/loginUser", 
    async (userData, {rejectWithValue}) => {
        try {
            const res = await api.post("/auth/login", userData)
            return res.data
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return rejectWithValue(message)
        }
    } 
)


export const logoutUser = createAsyncThunk("auth/logoutUser", 
    async (_, {rejectWithValue}) => {
        try {
            await api.post("/auth/logout", {})
            return true
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return rejectWithValue(message)
        }
    } 
)


export const forgetPassword = createAsyncThunk("auth/forgetPassword", 
    async (email, {rejectWithValue}) => {
        try {
           const res = await api.post("/auth/forget-password",  email)
            return  res.data
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return rejectWithValue(message)
        }
    } 
)

export const verifyResetOtp = createAsyncThunk("auth/verifyResetOtp", 
    async ({email, otp}, {rejectWithValue}) => {
        try {
           const res = await api.post("/auth/verify-reset-otp", {email, otp})
            return  res.data
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return rejectWithValue(message)
        }
    } 
)

export const changePassword = createAsyncThunk("auth/changePassword", 
    async ({email, newPassword, confirmPassword}, {rejectWithValue}) => {
        try {
           const res = await api.post("/auth/change-password",{
            email,
            newPassword,
            confirmPassword
           })
            return  res.data
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return rejectWithValue(message)
        }
    } 
)

