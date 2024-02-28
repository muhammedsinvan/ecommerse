import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { connectDB } from './connection/database.js';
import userrouter from './routes/user.js';
import adminrouter from './routes/admin.js';
import striperouter from './routes/stripe.js';
import cors from 'cors';
import bodyParser from 'body-parser';

connectDB();

const app = express();

app.use(express.json({limit:'25mb'})); 
app.use(express.urlencoded({limit:'25mb',extended:true}))
app.use(bodyParser.json());

app.use(cors());



app.use('/api/',userrouter);
app.use('/api/admin',adminrouter);
app.use('/api/stripe',striperouter);


app.listen(8000, ()=>{
    console.log(`server started at 8000`) 
})  