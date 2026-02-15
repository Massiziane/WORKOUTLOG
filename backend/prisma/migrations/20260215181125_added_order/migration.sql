/*
  Warnings:

  - Made the column `notes` on table `WorkoutExercise` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_categoryId_fkey";

-- AlterTable
ALTER TABLE "Exercise" ALTER COLUMN "categoryId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "order" INTEGER;

-- AlterTable
ALTER TABLE "WorkoutExercise" ALTER COLUMN "notes" SET NOT NULL;

-- AlterTable
ALTER TABLE "WorkoutSet" ADD COLUMN     "order" INTEGER;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
