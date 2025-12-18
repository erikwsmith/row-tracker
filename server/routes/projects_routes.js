import express from 'express';
import {getAllProjects, getProject} from '../controllers/projects_controller.js'

const router = express.Router();

// get all projects
router.get('/', getAllProjects);

// get project by id
router.get('/:project_id', getProject);

export default router;