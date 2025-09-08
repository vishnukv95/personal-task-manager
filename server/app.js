import express from 'express'
import dotenv from 'dotenv'
import { connectDb } from './config/db.js'
import cors from 'cors'
import authRouter from './routes/authRoutes.js';
import taskRouter from './routes/taskRoutes.js';



dotenv.config();

const app = express();
app.use(express.json())

app.use(cors(
    {origin:"http://localhost:5173"}
));




app.use('/api/auth',authRouter)
app.use('/api/task',taskRouter)

await connectDb()
app.listen(process.env.PORT,()=>console.log("SERVER STARTED"))
