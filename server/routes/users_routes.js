import {getAllUsers, getUser, addUser, updateUser, deleteUser} from '../controllers/users_controller.js'

import express from 'express';

const router = express.Router();

// get all users
router.get('/', getAllUsers);

// get user by id
router.get('/:user_id', getUser);

// add new user
router.post('/', addUser)

// update user by id
router.put('/:user_id', updateUser);

// delete user by id
router.delete('/:user_id', deleteUser);


export default router;