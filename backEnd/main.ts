import express from "express";
import dbconnection from "./src/config/database";
import dotenv from 'dotenv'
import mountRoutes from "./src";

const app:express.Application =express()
app.use(express.json())
dotenv.config()
dbconnection()
mountRoutes(app)
app.listen(process.env.PORT,()=>{
    console.log(`server started on port ${process.env.PORT}`)
}) 