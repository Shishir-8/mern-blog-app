import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs'
import { generateOtp } from "../utils/generateOtp.js";
import sendEmail from "../utils/sendEmail.js";
import admin from "../config/firebase.js";

// Generate Token

export const googleLogin = async (req, res) => {
  try {
    const firebaseToken = req.headers.authorization?.split(" ")[1];
        if (!firebaseToken) {
            return res.status(401).json({ message: "No token" })
        }
        const decoded = await admin.auth().verifyIdToken(firebaseToken)

        const {name, email, uid} = decoded

        let user = await userModel.findOne({email: decoded.email})
        if(!user) {
          user =  new userModel ({
            name: name,
            email,
            password: '',
            googleUid: uid
          })
        }

        await user.save()

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

    res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

    res.status(200).json({
      success: true,
      message: "User registered succesfully",
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });

        
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


// Register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const userExists = await userModel.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Email already exists" });

    const hashPassword = await bcrypt.hash(password, 10)

    const otp = generateOtp()
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000)

    const user = new userModel({
      name,
      email,
      verifyOtp: otp,
      verifyExpireAt: otpExpiry,
      password: hashPassword,
      role: "user"
    });

    await user.save()

    // send otp to verify email
    await sendEmail({
      to: user.email,
      subject: "Verify your email",
      text: `Your OTP to verify email is ${otp}.`
    })

    res.status(200).json({
      success: true,
      message: "Otp sent successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({
        message: "Please provide credentials"
      })
    }

    const user = await userModel.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    if (user.isAccountVerified) {
      return res.json({ success: true, message: "Account already verified" })
    }

    if (!user.verifyOtp || user.verifyOtp !== otp || user.verifyExpireAt < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" })
    }

    user.verifyOtp = null;
    user.verifyExpireAt = null
    user.isAccountVerified = true

    await user.save()

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

    res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

    res.status(200).json({
      success: true,
      message: "User registered succesfully",
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });


  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
}

//resend otp

export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Provide credentials" })
    }

    const user = await userModel.findOne({ email })
    if (!user) return res.status(404).json({ message: "User not found" })

    if (user.isAccountVerified) {
      return res.status(400).json({ message: "Account already verified" })
    }

    const otp = generateOtp()
    user.verifyOtp = otp;
    user.verifyExpireAt = Date.now() + 5 * 60 * 1000

    await user.save()

    await sendEmail({
      to: user.email,
      subject: "Verify your email",
      text: `Your OTP to verify email is ${otp}.`
    })

    res.status(200).json({
      success: true,
      message: "New OTP sent successfully to your email"
    })

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
}

// Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

    res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Logout
export const logoutUser = (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({
      success: true,
      message: "Logged Out"
    })
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//forget password for

export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const otp = generateOtp()
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000)

    user.resetOtp = otp;
    user.resetOtpVerified = false
    user.resetOtpExpiresAt = otpExpiry

    await user.save()

    await sendEmail({
      to: user.email,
      subject: "Password Reset OTP",
      text: `Hello ${user.name}, your password reset OTP is ${otp}`
    })

    res.status(200).json({
      success: true,
      message: "Password reset OTP sent to your email"
    })

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
}

export const verifyResetOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: "Provide credentials" })
    }

    const user = await userModel.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    if (user.resetOtp !== otp || user.resetOtpExpiresAt < new Date()) {
      return res.status(400).json({ message: "Invalid or Expired OTP" })
    }

    user.resetOtpVerified = true

    await user.save()


    res.status(200).json({
      success: true,
      message: "OTP verified. You can now reset your password"
    })

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
}

export const changePassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;
    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "Provide credentials" })
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Password don't match" })
    }

    const user = await userModel.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: "User not found" })
    }

    if (!user.resetOtpVerified) {
      return res.status(403).json({ message: "OTP verification required" })
    }

    user.password = await bcrypt.hash(newPassword, 10);

    user.resetOtp = null;
    user.resetOtpExpiresAt = null
    user.resetOtpVerified = false;

    await user.save()



    res.status(200).json({
      success: true,
      message: "Password reset successfully"
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}





