import { type Request, type Response} from 'express';
import prisma from '../utils/prisma';
import type { UserParams } from '../types/userparams';

// GET All USERS
export const getAllUsers = async (req : Request, res: Response) => {
    try {
        const users  = await prisma.user.findMany({
            select: { id : true, firstName: true, lastName: true, email: true, username: true, createdAt: true}
        });
        res.json(users);
    } catch(error) {
        res.status(500).json({message: 'Erreur serveur'})
    }
}

// Get A USER 
export const getUserById = async (req : Request<UserParams>, res: Response) => {
    try{
        const { id } = req.params;
        const user = await prisma.user.findUnique({
            where: { id: Number(id) }
        });
        if(!user){
            return res.status(404).json({message: 'Utilisateur introuvable'});
        }
        res.json(user);

    }catch(eroor){
        res.status(500).json({message: 'Erreur serveur'})
    }
}

// POST (create a new user)
export const createUser = async (req: Request, res: Response) => {
    try{
        const { firstName, lastName, email, username, password, createdAt, updatedAt } = req.body;
        const newUser = await prisma.user.create({
            data: {firstName, lastName, email, username, password, createdAt, updatedAt}
        });
        res.status(201).json(newUser);
        }catch(error){
        res.status(500).json({message: 'Erreur serveur'})
    }
}

// PUT update USER by Id
export const updateUser = async (req: Request<UserParams>, res: Response) => {
    try{
        const { id } = req.params;
        const { firstName, lastName, email, username } = req.body;

        const updateUser = await prisma.user.update({
            where : { id: Number(id) },
            data: { firstName, lastName, email, username }
        });
        res.json(updateUser);
    }catch(error){
        res.status(500).json({message: 'Erreur serveur'})
    }
}

// DELETE delete a USER by ID
export const deleteUser = async (req: Request<UserParams>, res: Response) => {
    try{
        const { id } = req.params;
        await prisma.user.delete({
            where : { id: Number(id) }
        });
        res.status(204).send()
    }catch(error){
        res.status(500).json({message: 'Erreur serveur'})
    }
}

// Get all users (aggregation)
export const getUserCount = async (req: Request, res: Response) => {
    try{
        const count = await prisma.user.count();
        res.json({ getUserCount : count})
    }catch(error){
        res.status(500).json({message: 'Erreur serveur'})
    }
}

// Get users with programs
export const usersPrograms = async (req: Request<UserParams>, res: Response) => {
    try{
        const { id } = req.params
        const usersWithPrograms = await prisma.user.findUnique({
            where: { id: Number(id) },
            include: { programs: true }
        });

        }catch(error){
        res.status(500).json({message: 'Erreur serveur'})
    }
}
