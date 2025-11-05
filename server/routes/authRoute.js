import express from "express"
import { changePassword, forgetPassword, googleLogin, loginUser, logoutUser, registerUser, verifyEmail, verifyResetOtp } from "../controllers/authController.js"


const router = express.Router()

router.post('/register', registerUser)
router.post("/verify-email", verifyEmail)
router.post('/login', loginUser)
router.post("/logout", logoutUser)

router.post("/forget-password", forgetPassword)
router.post("/verify-reset-otp",  verifyResetOtp)
router.post("/change-password", changePassword)

router.post("/google-login", googleLogin)


export default router