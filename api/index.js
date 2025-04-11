import express from 'express'
import dotenv from  'dotenv'
import cors from 'cors'
import connectDB from './database/database.js'
import route from './routes/routesUser.js'


dotenv.config();

const app=express();

app.use(express.json());

app.use(cors({
    origin:true,
    credentials:true
}));

app.use(route)

app.get('/',(req,res)=>{
    res.send('server is runing')
});

const PORT= process.env.PORT || 3000;

connectDB()

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})
