import usersRoutes from './routes/users_routes.js';
import projectsRoutes from './routes/projects_routes.js';

import express from 'express';

const app = express();
const PORT = 5001;

app.get('/', (req, res)=>{
    res.send("Landing Page")
    }
);

app.use('/api/users', usersRoutes);
app.use('/api/projects', projectsRoutes);

app.listen(PORT, ()=> {
    console.log(`App listening at "http://localhost:${PORT}"`)
});
