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
   
    
   res.status(201).json({message:"account created",user,token });

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
 if (!process.env.SECRET_KEY) {
      console.error("SECRET_KEY missing!");
      return res.status(500).json({ error: "Server misconfigured" });
    }
const token = jwt.sign({email:user.email}, process.env.SECRET_KEY);

res.json({ message:"logged in",user: { id: user._id, name: user.name, email: user.email },token });
} catch (err) {
console.error(err);
res.status(500).json({error: 'Server error' });
}
};




