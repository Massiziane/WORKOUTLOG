/*
  Warnings:

  - You are about to drop the column `exerciseId` on the `SetTemplate` table. All the data in the column will be lost.
  - Added the required column `workoutExerciseId` to the `SetTemplate` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SetTemplate" DROP CONSTRAINT "SetTemplate_exerciseId_fkey";

-- AlterTable
ALTER TABLE "SetTemplate" DROP COLUMN "exerciseId",
ADD COLUMN     "workoutExerciseId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "WorkoutExercise" ALTER COLUMN "notes" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "SetTemplate" ADD CONSTRAINT "SetTemplate_workoutExerciseId_fkey" FOREIGN KEY ("workoutExerciseId") REFERENCES "WorkoutExercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
