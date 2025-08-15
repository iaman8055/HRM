import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
dotenv.config();

connectDB()
const app= express();
app.use(cors());

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
