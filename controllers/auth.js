import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */
// destructure fields from req param's body
// create a password hash using bcrypt
// create a new User object and pass the destructured field details
// save the user in the database
// set res param to a server response and json data of saved user

export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email, 
            password,
            userType,
            picturePath,
            connections,
            location,
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User(
            {
                firstName,
                lastName,
                email, 
                password: passwordHash,
                userType,
                picturePath,
                connections,
                location,
            });
            // saving the user and returning a result with a 201 response
            // returning the details of saved user in json format
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
            console.log("savedUser", savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

/* LOGGING IN */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email)
        console.log(password)
        const user = await User.findOne({ email: email });
        console.log(user)
        if(!user) return res.status(400).json({ msg: "User does not exist. "});

        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch)
        if(!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        delete user.password;
        res.status(200).json({ token, user });
    } catch (err){
        res.status(500).json({ error: err.message });
    }
}