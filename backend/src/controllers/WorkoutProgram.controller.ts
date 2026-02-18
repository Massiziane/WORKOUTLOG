import type { Request, Response } from 'express';
import prisma from '../utils/prisma';

// Create a ProgramWorkout entry
export const addWorkoutToProgram = async (req: Request, res: Response) => {
  try {
    const { programId, workoutId, order } = req.body;

    if (!programId || !workoutId) {
      return res.status(400).json({ error: "programId and workoutId are required" });
    }

    const newPW = await prisma.programWorkout.create({
      data: {
        programId: Number(programId),
        workoutId: Number(workoutId),
        order: order ?? 0,
      },
      include: {
        workout: true,
        program: true,
      },
    });

    res.status(201).json(newPW);
  } catch (error) {
    console.error("Add workout to program error:", error);
    res.status(500).json({ error: "Failed to add workout to program" });
  }
};
