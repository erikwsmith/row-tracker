import { ArrowLeftIcon } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router'; 
import toast from 'react-hot-toast';
import axios from 'axios';

const addProject = () => {
    
    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ loading, setLoading ] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!title.trim() || !description.trim()){
            toast.error("All fields are required.");
            return;
        };

        setLoading(true);
        try {
            await axios.post("http://localhost:5001/api/projects", {
                title,
                description
            });
            toast.success("Project created successfully!");
            navigate("/");
        } catch (error) {
            console.log("Error creating project.", error);
            if(error.response.status === 429){
                toast.error("Slow down! You are creating projects too fast.", {
                    duration: 2500
                })
            } else {
                toast.error("Failed to create project.");
            }
            
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="min-h-screen bg-base-100">
                <div className='container mx-auto px-4 py-8'>
                    <div className='max-w-2xl mx-auto'>
                        <Link to={"/"} className='btn btn-ghost mb-6'>
                            <ArrowLeftIcon className='size-5'/>
                            Back to Projects
                        </Link>
                        <div className='card bg-base-300'>
                            <div className='card-body'>
                                <h2 className='card-title text-2xl mb-4'>Create New Project</h2>
                                <form onSubmit={handleSubmit} className=''>
                                    <div className='form-control mb-4'>
                                        <label className='label block'>
                                            <span className='label-text'>Title</span>
                                        </label>
                                        <input 
                                            type="text" placeholder='Project Title' className='input input-bordered'
                                            value={title} onChange={(e)=> setTitle(e.target.value)}                                        
                                        />                                       
                                    </div>
                                    <div className='form-control mb-4'>
                                        <label className='label block'>
                                            <span className='label-text'>Description</span>
                                        </label>
                                        <textarea 
                                            placeholder='Project Description' className='textarea textarea=bordered h-32'
                                            value={description} onChange={(e)=> setDescription(e.target.value)}                                        
                                        />                                       
                                    </div>
                                    <div className='card-actions justify-end'>
                                        <button className='btn btn-primary' type="submit" disabled={loading}>
                                            {loading? "Creating..." : "Create Project"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default addProject;