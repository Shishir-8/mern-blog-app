import {createSlice} from "@reduxjs/toolkit"
import { changePassword, forgetPassword, googleLogin, loginUser, logoutUser, registerUser, verifyEmail, verifyResetOtp } from "./authThunk"

const initialState  = {
    user: null,
    isLoading : false,
    message: ''
}

// we dont need isError also while working with unwrap()  but it is better to check response success that come from backend in components don't fully rely on unwrap()

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetState:(state) => {
            state.isLoading = false,
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder

        //google login

        .addCase(googleLogin.pending, (state)=> {
            state.isLoading = true;
        })

          .addCase(googleLogin.fulfilled, (state, action)=> {
            state.isLoading = false;
            state.user = action.payload.user
        })

          .addCase(googleLogin.rejected, (state, action)=> {
            state.isLoading = false;
            state.message = action.payload
        })

        // register user
        .addCase(registerUser.pending, (state) => {
            state.isLoading = true
        })

        .addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false,
            state.message = action.payload
        })

        .addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false,
            state.message = action.payload
        })

        //verify email

          .addCase(verifyEmail.pending, (state) => {
            state.isLoading = true
        })

        .addCase(verifyEmail.fulfilled, (state, action) => {
            state.isLoading = false,
            state.message = action.payload
            state.user = action.payload.user
        })

        .addCase(verifyEmail.rejected, (state, action) => {
            state.isLoading = false,
            state.message = action.payload
            state.user = null  
        })


        // for login slice 

        .addCase(loginUser.pending, (state) => {
            state.isLoading = true
        })

        .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false,
            state.user = action.payload.user
        })

        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false,
            state.message = action.payload
            state.user = null
        })


        // for logout

         .addCase(logoutUser.pending, (state) => {
            state.isLoading = true
        })

        .addCase(logoutUser.fulfilled, (state, action) => {
            state.isLoading = false,
            state.user = null
        })

        .addCase(logoutUser.rejected, (state, action) => {
            state.isLoading = false,
            state.message = action.payload
            state.user = null
        })

        //forget password


        .addCase(forgetPassword.pending, (state) => {
            state.isLoading = true
        })

        .addCase(forgetPassword.fulfilled, (state, action) => {
            state.isLoading = false,
            state.message = action.payload
        })

        .addCase(forgetPassword.rejected, (state, action) => {
            state.isLoading = false,
            state.message = action.payload
        })

        // verify resetOtp

         .addCase(verifyResetOtp.pending, (state) => {
            state.isLoading = true
        })

        .addCase(verifyResetOtp.fulfilled, (state, action) => {
            state.isLoading = false,
            state.message = action.payload
        })

        .addCase(verifyResetOtp.rejected, (state, action) => {
            state.isLoading = false,
            state.message = action.payload
        })

        // change password

        .addCase(changePassword.pending, (state) => {
            state.isLoading = true
        })

        .addCase(changePassword.fulfilled, (state, action) => {
            state.isLoading = false,
            state.message = action.payload
        })

        .addCase(changePassword.rejected, (state, action) => {
            state.isLoading = false,
            state.message = action.payload
        })


    }
})


export const {resetState} = authSlice.actions
export default authSlice.reducer