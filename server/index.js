import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { connectDB } from './connection/database.js';
import userrouter from './routes/user.js';
import adminrouter from './routes/admin.js';
import cors from 'cors';
import path from 'path';

connectDB();

const app = express();

app.use(express.json({limit:'25mb'})); 
app.use(express.urlencoded({limit:'25mb',extended:true}))
app.use(cors())

if (process.env.NODE_ENV === 'production'){
// Serve static files from the React app
const currentPath = new URL('.', import.meta.url).pathname;
app.use(express.static(path.join(currentPath, '../cliend/build')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../cliend/build', 'index.html'));
});
}

app.use('/api/',userrouter);
app.use('/api/admin',adminrouter)


app.listen(8000, ()=>{
    console.log(`server started at 8000`) 
})  