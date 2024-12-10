import express from "express";
import dbconnection from "./src/config/database";
import dotenv from 'dotenv'
import mountRoutes from "./src";
import { Server } from "http";
import i18n from "i18n";
import path from "path";

const app:express.Application =express()
app.use(express.json())
let server:Server
dotenv.config()
i18n.configure({
    locales:['en','ar'],
    directory:path.join(__dirname,'locales'),
    defaultLocale:'en',
    queryParameter:'lang'
})
app.use(i18n.init)
dbconnection()
mountRoutes(app)
server= app.listen(process.env.PORT,()=>{
    console.log(`server started on port ${process.env.PORT}`)
}) 
process.on('unhandledRejection', (err: Error) => {
    console.error(`unhandledRejection ${err.name} | ${err.message}`);
    server.close(() => {
        console.error('shutting the application down');
        process.exit(1);
    });
});