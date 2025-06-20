import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import lessonRoutes from './routes/lessonRoutes.js'

dotenv.config(); //Load env variables

const app = express();

//middleware
app.use(express.json());

//get lessons
app.use('/api/lessons', lessonRoutes);

//connect to MongoDB
connectDB();

//API routes
app.get('/', (req, res)=> {
    res.send('API is working')
})


//start server 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`))

