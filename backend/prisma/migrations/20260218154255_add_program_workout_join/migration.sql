/*
  Warnings:

  - The primary key for the `ProgramWorkout` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[programId,workoutId]` on the table `ProgramWorkout` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `ProgramWorkout` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProgramWorkout" DROP CONSTRAINT "ProgramWorkout_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "ProgramWorkout_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "ProgramWorkout_programId_workoutId_key" ON "ProgramWorkout"("programId", "workoutId");
