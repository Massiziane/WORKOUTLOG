import { Router } from 'express';

import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUserCount,
    syncUserFromClerk
} from '../controllers/user.controller';

const router = Router();

router.post("/sync", syncUserFromClerk);


// Get - localhost:3000/users
router.get('/', getAllUsers);

// Get User Count - localhost:3000/users/count
router.get('/count', getUserCount);

// Get - localhost:3000/users/:id
router.get('/:id', getUserById);

// Post - localhost:3000/users/
router.post('/', createUser);

// Put - localhost:3000/users/:id
router.put('/:id', updateUser);

// Delete - localhost:3000/users/:id
router.delete('/:id', deleteUser);

export default router;