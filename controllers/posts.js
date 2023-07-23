import Post from "../models/Post.js";
import User from "../models/User.js";
 

/* CREATE */
export const createPost = async (req, res) => {
    try {
        const { userId, legalDomain, description, picturePath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            userType: user.userType,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            legalDomain,
            userPicturePath: user.picturePath,
            picturePath,
            interests: [],
            comments: [],
        })

        await newPost.save();

        const post = await Post.find();
        res.status(201).json(post);

    } catch (err){
        res.status(409).json({ message: err.message })
    }
}

/* READ */
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);

    } catch (err){
        res.status(409).json({ message: err.message });
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = await req.params;
        const post = await Post.find({ userId });
        res.status(200).json(post);

    } catch (err){
        res.status(409).json({ message: err.message });
    } 
}

export const getPost = async (req, res) => {
    try {
        const { id } = await req.params;
        console.log(id)
        const post = await Post.findById(id);
        res.status(200).json(post);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

/* UPDATE */
// gets a post by an id
// gets user ids in the likes object of a post
// if isLiked is true, delete userId from likes object
// if not, add userId to likes object
// then create an updated post and pass id and likes
// send updatedPost as a successful response
export const postInterest = async (req, res) => {
    try {
        const { id } = req.params;
        const { user } = req.body;
        const post = await Post.findById(id);
        //const isInterested = post.interests.get(user.userId);
        //const index = post.interests.findIndex(user.userId)

        /*if(isInterested) {
            post.interests.splice(index, 1);
        } else {
            post.interests.push({user: user});
        }*/
        post.interests.push({user: user});

        const updatePost = await Post.findByIdAndUpdate(
            id,
            { interests: post.interests },
            { new: true }
        );

        res.status(200).json(updatePost);
    } catch (err){
        res.status(404).json({ message: err.message });
    }
}

export const postComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { user, comment } = req.body;
        console.log(req.body)
        const post = await Post.findById(id);
        post.comments.push({user: user, comment: comment });

        const updatePost = await Post.findByIdAndUpdate(
            id,
            { comments: post.comments },
            { new: true }
        );

        res.status(200).json(updatePost);
    } catch (err){
        res.status(404).json({ message: err.message });
    }
}