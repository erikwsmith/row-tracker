import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import usersRoutes from './routes/users_routes.js';
import projectsRoutes from './routes/projects_routes.js';
import dbConnect from './config/db_connect.js';
import rateLimiter from './middleware/rate_limiter.js';


dotenv.config();

const PORT = process.env.PORT;

const app = express();


// middleware
app.use(express.json());
app.use(cors());

app.use(rateLimiter);

/*app.use((req, res, next)=>{
    console.log("Request method is " + req.method);
    next();
})*/

dbConnect().then( ()=>{
    app.listen(PORT, ()=> {
        console.log(`App listening at "http://localhost:${PORT}"`);
        // routes

        app.use('/api/users', usersRoutes);
        app.use('/api/projects', projectsRoutes);
        app.get('/', (req, res)=>{
            res.json("Landing Page");
        }
        );
    });    
});


