/*
  Warnings:

  - You are about to drop the column `order` on the `WorkoutSet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WorkoutSet" DROP COLUMN "order",
ADD COLUMN     "setNumber" INTEGER;
