import type { Request, Response } from "express";
import prisma from '../utils/prisma';

export const getMuscleGroups = async (req: Request, res: Response) => {
  try {
    const categoryId = Number(req.query.categoryId);
    if (!categoryId) return res.status(400).json({ message: "categoryId is required" });

    const muscles = await prisma.muscleGroup.findMany({
      where: { categoryId },
      select: { id: true, name: true },
    });

    res.json(muscles);
  } catch (err) {
    console.error("Fetch muscle groups error:", err);
    res.status(500).json({ message: "Failed to fetch muscle groups", error: err instanceof Error ? err.message : err });
  }
};
