import type { Request, Response} from 'express';
import prisma from '../utils/prisma';
import type { Program } from '../types/program.model';

// GET All PROGRAMS
export const getAllPrograms = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.query.userId);

    if (!userId) {
      return res.status(400).json({ error: "Missing userId" });
    }

    const programs = await prisma.program.findMany({
      where: { userId },
      include: {
        programWorkouts: {
          include: { workout: true },
          orderBy: { order: "asc" }   
        }
      }
    });

    res.json(programs);
  } catch (error) {
    console.error("Failed to fetch programs:", error);
    res.status(500).json({ error: "Failed to fetch programs" });
  }
};


// Get A PROGRAM BY ID
export const getProgramById = async (req : Request<Program>, res: Response) => {
    try{
        const { id } = req.params;
        const program = await prisma.program.findUnique({
            where: { id: Number(id) },
            include: {
                programWorkouts: {
                    include: { workout: true },
                    orderBy: { order: "asc" }   
                }
            }
        });
        if (!program) {
            return res.status(404).json({ error: "Program not found" });
        }
        res.json(program);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch program" });
    }
};

// POST (create a new PROGRAM)
export const createProgram = async (req: Request, res: Response) => {
  try {
    const { name, Desc, userId, workouts } = req.body;

    if (!userId) return res.status(400).json({ error: "Missing userId" });
    if (!name) return res.status(400).json({ error: "Missing program name" });

    const newProgram = await prisma.program.create({
      data: {
        name,
        Desc: Desc ?? null,
        userId: Number(userId),
        programWorkouts: workouts?.length
          ? workouts.map((w: number, i: number) => ({ workoutId: w, order: i }))
          : undefined
      },
      include: { programWorkouts: { include: { workout: true } } }
    });

    res.status(201).json(newProgram);
  } catch (err) {
    console.error("Create program error:", err);
    res.status(500).json({ message: "Failed to create program", error: err instanceof Error ? err.message : err });
  }
};



// PUT update PROGRAM by Id
export const updateProgram = async (req: Request<Program>, res: Response) => {
    try{
        const programExists = await prisma.program.findUnique({ where: { id: Number(req.params.id) } });

        if (!programExists) {
            return res.status(404).json({ error: "Program not found" });
        }

        const { id } = req.params;
        const { name } = req.body;
        const updatedProgram = await prisma.program.update({
            where : { id: Number(id) },
            data: { name }
        });
        res.json(updatedProgram);
    } catch (error) {
        res.status(500).json({ error: "Failed to update program" });
    }   
};

// DELETE PROGRAM by Id
export const deleteProgram = async (req: Request<Program>, res: Response) => {
    try{
        const programExists = await prisma.program.findUnique({ where: { id: Number(req.params.id) } });

        if (!programExists) {
            return res.status(404).json({ error: "Program not found" });
        }

        const { id } = req.params;
        await prisma.program.delete({
            where : { id: Number(id) }
        });
        res.status(204).send()
    } catch (error) {
        res.status(500).json({ error: "Failed to delete program" });
    }
};