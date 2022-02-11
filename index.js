const express=require('express');
const app=express();
const mongoose=require('mongoose');
const print=require('./utils');
const authRoute=require('./routes/auth')
const dotenv=require('dotenv');

dotenv.config();
mongoose.connect(process.env.DB_CONNECT,()=>print("connect to DB"));
app.use(express.json())
app.use('/api/user',authRoute);

app.listen(3000,()=>{print("Up and running on port 3000")})