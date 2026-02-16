/*
  Warnings:

  - You are about to drop the column `workoutExerciseId` on the `SetTemplate` table. All the data in the column will be lost.
  - You are about to drop the `Progress` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Progress" DROP CONSTRAINT "Progress_bestSetId_fkey";

-- DropForeignKey
ALTER TABLE "Progress" DROP CONSTRAINT "Progress_userId_fkey";

-- DropForeignKey
ALTER TABLE "Progress" DROP CONSTRAINT "Progress_workoutId_fkey";

-- DropForeignKey
ALTER TABLE "SetTemplate" DROP CONSTRAINT "SetTemplate_workoutExerciseId_fkey";

-- AlterTable
ALTER TABLE "SetTemplate" DROP COLUMN "workoutExerciseId";

-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "frequency" INTEGER;

-- AlterTable
ALTER TABLE "WorkoutSet" ADD COLUMN     "order" INTEGER,
ADD COLUMN     "setTemplateId" INTEGER;

-- DropTable
DROP TABLE "Progress";

-- AddForeignKey
ALTER TABLE "WorkoutSet" ADD CONSTRAINT "WorkoutSet_setTemplateId_fkey" FOREIGN KEY ("setTemplateId") REFERENCES "SetTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;
