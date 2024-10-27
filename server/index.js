import express from 'express';
import dotenv from 'dotenv'
import cors from "cors"
import bodyParser from "body-parser"
import helmet from "helmet"
import morgan from "morgan"
import connectDb from './database/connect.js';
import logger from "./utils/logger.js"
import userRoute from './routes/userRoute.js'
//configuration
dotenv.config();
const app= express();

//cors
// app.use(cors({
//     origin: [process.env.frontend || 'http://localhost:5173'],  
//     methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],          
//     credentials: true,        
//   }))

//logger
const morganFormat = ":method :url :status :response-time ms";
app.use(
    morgan(morganFormat, {
      stream: {
        write: (message) => {
          const logObject = {
            method: message.split(" ")[0],
            url: message.split(" ")[1],
            status: message.split(" ")[2],
            responseTime: message.split(" ")[3],
          };
          logger.info(JSON.stringify(logObject));
        },
      },
    })
  );

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
//routes
app.use('/api/user', userRoute)
//server


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