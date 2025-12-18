const getAllProjects = (req, res)=>{    
    res.send("Projects");
};

const getProject = (req, res)=>{
    const projectID = req.params.project_id;
    res.send("Project ID: " + projectID);
};

module.exports = {
    getAllProjects,
    getProject
};