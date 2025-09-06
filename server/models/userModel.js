import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
name: { type: String, required: true },
email: { type: String, required: true, unique: true, lowercase: true },
password: { type: String, required: true }
}, { timestamps: true });

const userModel = mongoose.model('taskuser', userSchema);

export default userModel