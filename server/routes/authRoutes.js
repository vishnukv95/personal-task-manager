import express from "express"
import { getProfile, login, logoutUser, register } from "../controllers/authController.js"
import { authenticate } from "../middlewares/authMiddleware.js"


const authRouter = express.Router()

authRouter.post('/register',register)
authRouter.post('/login',login)
authRouter.get('/profile',authenticate,getProfile)
authRouter.post("/logout", logoutUser);



export default authRouter