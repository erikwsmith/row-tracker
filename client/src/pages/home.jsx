import { useEffect, useState } from 'react';
import Nav from '../components/nav';
import RateLimitedUI from '../components/rateLimitedUI';
import axios from "axios";
import toast from 'react-hot-toast';
import ProjectCard from '../components/projectCard';
import api from '../lib/axios';
import ProjectsNotFound from '../components/ProjectsNotFound';

const HomePage = () => {
    const [ isRateLimited, setIsRateLimited ] = useState(false); 
    const [ projects, setProjects ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect( ()=> {
        const fetchProjects = async() => {
            try {
                const res = await api.get("/projects");
                //console.log(res.data);
                setProjects(res.data);
                setIsRateLimited(false);
            } catch (error) {
                console.log("Error fetching projects.");
                if(error.response.status === 429){
                    setIsRateLimited(true);
                } else {
                    toast.error("Failed to load projects.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);
        
    return (
        <>        
            <div className="min-h-screen">
                < Nav />
                { isRateLimited && < RateLimitedUI />}
                <div className="max-w-7xl mx-auto p-4 mt-6" >
                    {loading && <div className="text-center text-primary py-10">Loading projects...</div>}

                    {projects.length === 0 && !isRateLimited && <ProjectsNotFound />}

                    {projects.length > 0 && !isRateLimited && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.map(project=>(
                                <div key={project._id} >
                                    <ProjectCard project={project} setProjects={setProjects}/>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>    
    )
}
export default HomePage;