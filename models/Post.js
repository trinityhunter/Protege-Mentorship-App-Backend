import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            //required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        userType: {
            type: String,
            required: true,
        },
        legalDomain: String,
        location: String,
        description: String,
        picturePath: String,
        userPicturePath: String,
        resolved: Boolean,
        interests: {
            type: Array,
            of: Object,
        },
        comments: {
            type: Array,
            of: Object,
        },
    },
    {
        timestamps: true,
    },
);

const Post = mongoose.model("Post", postSchema);

export default Post;