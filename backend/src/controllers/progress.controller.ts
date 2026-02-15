import type { Request, Response } from 'express';
import prisma from '../utils/prisma';
import type { Progress } from '../types/progress.type';

// GET All PROGRESS
export const getAllProgress = async (req: Request<Progress>, res: Response) => {
    try {
        const progressRecords = await prisma.progress.findMany({
            include: { user: true, workout: true, bestSet: true },
        });
        res.json(progressRecords);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch progress records" });
    }   
};

// Get A PROGRESS BY ID
export const getProgressById = async (req: Request<Progress>, res: Response) => {
    try {
        const { id } = req.params;
        const progressRecord = await prisma.progress.findUnique({
            where: { id: Number(id) }, include: { user: true, workout: true, bestSet: true},
        });

        if (!progressRecord) {
            return res.status(404).json({ error: "Progress record not found" });
        }
        res.json(progressRecord);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch progress record" });
    }
};

// POST (create a new PROGRESS)
export const createProgress = async (req: Request, res: Response) => {
    try {
        const { userId, workoutId, totalVolume, bestSetId, consistencyScore } = req.body;
        const newProgress = await prisma.progress.create({
            data: { userId: Number(userId), workoutId: Number(workoutId), totalVolume: Number(totalVolume), bestSetId: Number(bestSetId), consistencyScore : Number(consistencyScore) },
        });
        res.status(201).json(newProgress);
        } catch (error) {
            res.status(500).json({ error: "Failed to create progress record" });
        }
    };

// PUT update PROGRESS by Id
export const updateProgress = async (req: Request<Progress>, res: Response) => {
    try {
        const { id } = req.params;
        const { totalVolume, bestSet, consistencyScore } = req.body;

        const existingProgress = await prisma.progress.findUnique({
            where: { id: Number(id) }
        });
        if (!existingProgress) {
            return res.status(404).json({ error: "Progress record not found" });
        }

        const updatedProgress = await prisma.progress.update({
            where: { id: Number(id) },
            data: { totalVolume, bestSet, consistencyScore }
        });
        res.json(updatedProgress);
    } catch (error) {
        res.status(500).json({ error: "Failed to update progress record" });
    }
};

// DELETE PROGRESS by Id
export const deleteProgress = async (req: Request<Progress>, res: Response) => {
    try {
        const { id } = req.params;

        const existingProgress = await prisma.progress.findUnique({
            where: { id: Number(id) }
        });
        if (!existingProgress) {
            return res.status(404).json({ error: "Progress record not found" });
        }

        await prisma.progress.delete({
            where: { id: Number(id) }
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Failed to delete progress record" });
    }
};

