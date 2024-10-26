import express from 'express';
import dotenv from 'dotenv'
import cors from "cors"
import bodyParser from "body-parser"
import helmet from "helmet"
import morgan from "morgan"
import connectDb from './database/connect.js';

//configuration
dotenv.config();
const app= express();

//cors

// app.use(cors({
//     origin: [process.env.frontend || 'http://localhost:5173'],  
//     methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],          
//     credentials: true,        
//   }))


app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

//server
app.use((req,res)=>{
    res.send("Hello")
})
const server = () => {
    try {
        connectDb(process.env.MONGO_URL);
        app.listen(process.env.PORT || 8000, () => {
            console.log(`server running on http://localhost:${process.env.PORT}`);

        })
    } catch (error) {
        console.log(error);

    }
}
server()