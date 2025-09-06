import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import userModel from "../models/userModel.js"



export const  register = async (req, res) => {
    console.log("route hit", req.body)
    
    const { name, email, password } = req.body;
    if (!name || !email || !password){
       console.log('missing fields')
       return res.status(400).json({error: 'All fields required' })
    };
   
    
    try {
     
      const existing = await userModel.findOne({ email });
      if (existing) return res.status(400).json({ error: 'User already exists' });
   
    const hashed = await bcrypt.hash(password, 10);
   
    const user = await userModel.create({ name, email, password: hashed });
   
    const token = jwt.sign({email:user.email}, process.env.SECRET_KEY);
   
    user.password = undefined
   
    res.cookie("token",token)
   res.status(201).json({message:"account created",user });

} catch (err) {
console.error(err);
 res.status(500).json({error: 'Server error' });
}
};

export const login = async (req, res) => {
const { email, password } = req.body;
if (!email || !password) return res.status(400).json({error: 'All fields required' });
try {
const user = await userModel.findOne({ email });
if (!user) return res.status(400).json({error: 'Invalid credentials' });
const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) return res.status(400).json({error: 'Invalid credentials' });
const token = jwt.sign({email:user.email}, process.env.SECRET_KEY);
 res.cookie("token",token)
res.json({ message:"logged in",user: { id: user._id, name: user.name, email: user.email } });
} catch (err) {
console.error(err);
res.status(500).json({error: 'Server error' });
}
};


export const getProfile = async (req, res) => {
  try {
    if(!req.user) return res.status(401).json({error:"not authenticated"})
        
    res.status(200).json({user: req.user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};


export const logoutUser = (req, res) => {
  res.clearCookie("token"); 
  return res.json({ message: "Logged out successfully" });
};