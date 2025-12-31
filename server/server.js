import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import usersRoutes from './routes/users_routes.js';
import projectsRoutes from './routes/projects_routes.js';
import dbConnect from './config/db_connect.js';
import rateLimiter from './middleware/rate_limiter.js';


dotenv.config();

const PORT = process.env.PORT;
const app = express();
const __dirname = path.resolve();

// middleware
if(process.env.NODE_ENV !== "production"){
    app.use(cors());
};
app.use(express.json());
app.use(rateLimiter);

/*app.use((req, res, next)=>{
    console.log("Request method is " + req.method);
    next();
})*/
app.use('/api/users', usersRoutes);
app.use('/api/projects', projectsRoutes);

// if NODE_ENV variable in .env file is equal to "production"
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../client/dist")));

    // if any route other than project or users is requested, serve the static site
    app.get("/{*blah}", (req,res)=>{
        res.sendFile(path.join(__dirname, "../client", "dist", "index.html"))
    })
}

dbConnect().then( ()=>{
    app.listen(PORT, ()=> {
        console.log(`App listening at "http://localhost:${PORT}"`);
        // routes
    });    
});


