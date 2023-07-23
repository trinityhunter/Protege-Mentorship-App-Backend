import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 8,
        },
        userType: {
            type: String,
            required: true,
        },
        picturePath: {
            type: String,
            default: "",
        },
        connections: {
            type: Array,
            default: [],
        },
        practiceType: {
            type: Array,
            default: []
        },
        location: String,
        experience: Number,
        practiceCourt: String,
        available: Boolean,
        fees: String,
    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;