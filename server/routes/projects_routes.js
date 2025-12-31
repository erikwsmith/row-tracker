import express from 'express';
import {getAllProjects, getProject, addProject, updateProject, deleteProject} from '../controllers/projects_controller.js'

const router = express.Router();

// get all projects
router.get('/', getAllProjects);

// get project by id
router.get('/:project_id', getProject);

// add new project
router.post('/', addProject);

// update project by id
router.put('/:project_id', updateProject);

// delete project by id
router.delete('/:project_id', deleteProject);

export default router;