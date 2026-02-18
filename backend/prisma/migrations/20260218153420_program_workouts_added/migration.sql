/*
  Warnings:

  - You are about to drop the column `programId` on the `Workout` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_programId_fkey";

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "programId";

-- CreateTable
CREATE TABLE "ProgramWorkout" (
    "programId" INTEGER NOT NULL,
    "workoutId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "ProgramWorkout_pkey" PRIMARY KEY ("programId","workoutId")
);

-- AddForeignKey
ALTER TABLE "ProgramWorkout" ADD CONSTRAINT "ProgramWorkout_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramWorkout" ADD CONSTRAINT "ProgramWorkout_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
