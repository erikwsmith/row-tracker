import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import toast, { LoaderIcon } from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router';
import { ArrowLeftIcon, Trash2Icon } from 'lucide-react';

let BASE_URL = "";
if(process.env.NODE_ENV === "production"){
    BASE_URL = "https://row-tracker.onrender.com/api/projects";
} else {
    BASE_URL = "http://localhost:5001/api/projects"
}

const editProject = () => {
    const [ project, setProject ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ saving, setSaving ] = useState(false);

    const navigate = useNavigate();
    const {projectid} = useParams();

    const handleDelete = async() => {
        if(!window.confirm("Are you sure you want to delete this project?")){ return };
        try {
            await axios.delete(`${BASE_URL}/${projectid}`);            
            toast.success("Project deleted successfully!");
            navigate("/");
        } catch (error) {
            console.log("Error deleting the project.");
            toast.error("Failed to delete project.");            
        }
    };
    const handleSave = async () => {
        if(!project.title.trim() || !project.description.trim()){
            toast.error("Please add a title and description.");
            return;
        };
        setSaving(true);

        try {
            await axios.put(`${BASE_URL}/${projectid}`, project);
            toast.success("Project updated successfully!");
            navigate("/");
        } catch (error) {
            console.log("Error updating the project.");
            toast.error("Failed to update project.");
        } finally {
            setSaving(false);
        }
    };

    useEffect (() => {
        const fetchProject = async () =>{
            try {
               const res = await axios.get(`${BASE_URL}/${projectid}`); 
               setProject(res.data);
            } catch (error) {
                console.log("Error fetching project.");
                toast.error("Failed to fetch project.");
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [projectid]);

    console.log({ project });

    if (loading) {
        return (
            <div className='min-h-screen bg-base-200 flex items-center justify-center'>
                <LoaderIcon className='animate-spin size-10'/>
            </div>
        )
    }
    return (
        <div className='min-h-screen bg-base-200'>
            <div className='container mx-auto px-4 py-8'>
                <div className='max-w-2xl mx-auto'>
                    <div className='flex items-center justify-between mb-6'>
                        <Link to={"/"} className='btn btn-ghost'>
                        <ArrowLeftIcon className='h-5 w-5'/>
                        Back to projects
                        </Link>
                        <button onClick={handleDelete} className='btn btn-error btn-outline'>
                            <Trash2Icon className='h-5 w-5'/>
                            Delete Project
                        </button>
                    </div>
                    <div className='card bg-base-100'>
                        <div className='card-body'>
                            <div className='form-control mb-4'>
                                <label className='label block'>
                                    <span className='label-text'>Title</span>
                                </label>
                                <input
                                    type="text" 
                                    placeholder='Project title' 
                                    className='input input-bordered'
                                    value={project.title} 
                                    onChange={(e)=> setProject({...project, title: e.target.value})}                                                                    
                                />
                            </div>
                            <div className="form-control mb-4">
                                <label className="label block">
                                    <span className='label-text'>Description</span>
                                </label>
                                <textarea
                                    placeholder='Write your project description here...'
                                    className="textarea textarea-bordered h-32"
                                    value={project.description}
                                    onChange={(e)=>setProject({...project, description: e.target.value})}
                                />                                
                            </div>
                            <div className="card-actions justify-end">
                                <button className='btn btn-primary' disabled={saving} onClick={handleSave}>
                                    {saving? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
    

export default editProject;