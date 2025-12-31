import Project from '../models/projects-model.js';

export async function getAllProjects (req, res){    
    try{        
        const projects = (await Project.find().sort({ createdAt: -1 })); // sorts by most recently created
        res.status(200).json(projects);
    } catch (error) {
        console.error("Error in projects_controller");
        res.status(500).json({message: "Internal server error"})
    }
};

export async function getProject (req, res){
    const projectID = req.params.project_id;
    try{        
        const project = await Project.findById(projectID);        
        res.status(200).json(project);
    } catch (error) {
        console.error("Error in projects_controller");
        res.status(500).json({message: "Internal server error"})
    }
};
export async function addProject (req, res){   
    try{        
        const {title, description} = req.body;
        const newProject = new Project({title, description});
        await newProject.save();
        res.status(201).json({message: "Project created successfully!"});
    } catch (error) {
        console.error("Error in projects_controller");
        res.status(500).json({message: "Internal server error"})
    }
};

export async function updateProject (req, res){   
    const projectID = req.params.project_id;
    try{     
        const {title, description} = req.body;   
        const project = await Project.findByIdAndUpdate(projectID, { title, description });        
        res.status(200).json({message: "Project updated successfully!"});
    } catch (error) {
        console.error("Error in projects_controller");
        res.status(500).json({message: "Internal server error"})
    }
};

export async function deleteProject (req, res){   
    const projectID = req.params.project_id;
    try{               
        const project = await Project.findByIdAndDelete(projectID);        
        res.status(200).json({message: "Project has been deleted."});
    } catch (error) {
        console.error("Error in projects_controller");
        res.status(500).json({message: "Internal server error"})
    }
};