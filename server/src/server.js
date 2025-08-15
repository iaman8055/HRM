import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import authroutes from './routes/authRoutes.js'
import candidateroutes from './routes/candidatesRoutes.js'
import employeeroutes from './routes/employeeRoutes.js'
dotenv.config();
connectDB()
const app= express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authroutes);
app.use("/api/candidate", candidateroutes);
app.use("/api/employee", employeeroutes);


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
