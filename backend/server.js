import express from "express";
import mongoose, { connect } from "mongoose";
import "dotenv/config";
import User from "./src/models/user.model.js";
import { connectDb } from "./src/lib/db.js";
import cors from "cors";
import {clerkMiddleware} from "@clerk/express" 


const app = express();
const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL ;

app.use(express.json());                                  //To convert data into json format
app.use(cors({ origin: FRONTEND_URL }));                  //For cross origin resource sharing 
app.use(clerkMiddleware());  

app.get("/health" , (req,res) => {
    res.status(200).json({ok:true})
})

app.listen(PORT,()=>{
    connectDb();
    console.log("Server is up and running on PORT:" ,PORT);
})
