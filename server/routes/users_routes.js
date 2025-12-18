import {getAllUsers, getUser} from '../controllers/users_controller.js'

import express from 'express';

const router = express.Router();

// get all users
router.get('/', getAllUsers);

// get user by id
router.get('/:user_id', getUser);

export default router;