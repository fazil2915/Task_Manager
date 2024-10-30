import User from '../Model/user.js'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

//register
export const register = async (req, res) => {
    try {
        const {
            userName,
            email,
            password
        } = req.body
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "Email already exists" });
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newTeacher = new User({
            userName,
            email,
            password: hashedPassword
        })
        const savedUser = await newTeacher.save();
        res.status(201).json(savedUser)
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
}
//login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ msg: "User doesnt exist" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credential" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
}

//logout
// export const logout=async(req,res)=>{
//     try {
//         res.status(200).json({msg:"Logged out"})
//     } catch (error) {
//         res.status(500).json({err:error.message})
//     }
// }
