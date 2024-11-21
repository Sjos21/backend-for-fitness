import express from 'express';

import {config} from 'dotenv';
import cors from 'cors';
import { sendemail } from './utils/sendemail.js';

const app=express();
const router=express.Router();

config({path: "./config.env"});

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["POST"],
    credentials:true,
}));


app.use(express.json());
app.use(express.urlencoded({extended:true}));

router.post("/send/mail", async (req,res,next)=>{
    const {name,email,message}=req.body;
    if(!name || !email || !message){
        return next(res.status(400).json({
            success:false,
            message:"Please provide all the mentioned details!",
        }));
    }
    try {
        await sendemail({
            email :"joshishivranjan@gmail.com",
            subject: "Gym website contact information",
            message,
            useremail: email,
        });
        res.status(200).json({
            success:true,
            message:"Message sent successfully!",
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal server error",
        });
        
    }
});


app.use(router);

app.listen(process.env.PORT, ()=>{
    console.log(`Server listening at ${process.env.PORT}`)
})

