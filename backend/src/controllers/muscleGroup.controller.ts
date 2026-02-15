import type { Request, Response } from "express";
import prisma from '../utils/prisma';
import type { MuscleGroup } from "../generated/prisma/client";
import type { muscleGroup } from "../types/muscleGroup";

// GET /muscle-groups
export const getAllMuscleGroups = async (req: Request, res: Response) => {
  try {
    const muscleGroups = await prisma.muscleGroup.findMany({
      include: { exercises: true }, 
    });
    res.status(200).json(muscleGroups);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch muscle groups" });
  }
};

// GET /muscle-groups/:id
export const getMuscleGroupById = async (req: Request<MuscleGroup>, res: Response ) => {
  try {
    const { id } = req.params;
    const muscleGroup = await prisma.muscleGroup.findUnique({
      where: { id: Number(id) },
      include: { exercises: true },
    });
    if (!muscleGroup)
      return res.status(404).json({ message: "Muscle group not found" });

    res.status(200).json(muscleGroup);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch muscle group" });
  }
};


// POST /muscle-groups
export const createMuscleGroup = async (req: Request<muscleGroup>,res: Response ) => {
  try {
    const { name } = req.body;
    const newMuscleGroup = await prisma.muscleGroup.create({
      data: { name },
    });
    res.status(201).json(newMuscleGroup);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create muscle group" });
  }
};

// PUT /muscle-groups/:id
export const updateMuscleGroup = async (req: Request<MuscleGroup>, res: Response ) => {
  try {
    const { id } = req.params;
    const existing = await prisma.muscleGroup.findUnique({
      where: { id: Number(id) },
    });
    if (!existing)
      return res.status(404).json({ message: "Muscle group not found" });

    const { name } = req.body;
    const updated = await prisma.muscleGroup.update({
      where: { id: Number(id) },
      data: { name },
    });
    res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update muscle group" });
  }
};

// DELETE /muscle-groups/:id
export const deleteMuscleGroup = async ( req: Request<MuscleGroup>, res: Response ) => {
  try {
    const { id } = req.params;
    const existing = await prisma.muscleGroup.findUnique({
      where: { id: Number(id) },
    });
    if (!existing)
      return res.status(404).json({ message: "Muscle group not found" });

    await prisma.muscleGroup.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete muscle group" });
  }
};
