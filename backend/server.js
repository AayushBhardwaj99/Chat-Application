import express, { application } from "express";
import mongoose, { connect } from "mongoose";
import "dotenv/config";
import User from "./src/models/user.model.js";
import { connectDb } from "./src/lib/db.js";
import cors from "cors";
import {clerkMiddleware} from "@clerk/express" 
import fs from "fs";
import path from "path";
import job from "./src/lib/cron.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

const publicDir = path.join(process.cwd() , "public");

const app = express();
const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL ;

app.use(express.json());                                  //To convert data into json format
app.use(cors({ origin: FRONTEND_URL }));                  //For cross origin resource sharing 
app.use(clerkMiddleware());  
app.use("/api/webhooks/clerk", express.raw({type:application.json}),clerkWebHook);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.get("/health" , (req,res) => {
    res.status(200).json({ok:true})
})

if(fs.existsSync(publicDir)){
    app.use(express.static(publicDir));

    app.get("/{*any}",(req,res,next)=>{
        res.sendFile(path.join(publicDir,"index.html"),(err)=>next(err));
    })
}

app.listen(PORT,()=>{
    connectDb();
    console.log("Server is up and running on PORT:" ,PORT);

    if(process.env.NODE_ENV==="production"){
        job.start();
    }

})
