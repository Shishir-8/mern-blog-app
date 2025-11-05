import mongoose from "mongoose";

const userSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: [true]
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    verifyOtp: {
        type: String,
    },
    verifyExpireAt: {
        type: Date,
        default: null
    },
    isAccountVerified: {
        type: Boolean,
        default: false
    },

    // for password reset

    resetOtp: {
        type: String,
    },

    resetOtpExpiresAt: {
        type: Date,
        default: null
    },

    resetOtpVerified: {
        type: Boolean,
        default: false
    },

    //for google login

    googleUid: {
        type: String,
        default: null
    }

}, {timestamps: true})

const userModel = mongoose.model("User", userSchema)
export default userModel