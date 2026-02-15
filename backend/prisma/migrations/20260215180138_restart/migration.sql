/*
  Warnings:

  - The values [Admin] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `programId` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `MuscleGroup` table. All the data in the column will be lost.
  - You are about to drop the column `bestSet` on the `Progress` table. All the data in the column will be lost.
  - Changed the type of `type` on the `SetTemplate` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `updatedAt` to the `Workout` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SetType" AS ENUM ('WARMUP', 'MAIN', 'DROPSET', 'FINISHER');

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('USER', 'ADMIN');
ALTER TABLE "public"."User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';
COMMIT;

-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_programId_fkey";

-- DropForeignKey
ALTER TABLE "MuscleGroup" DROP CONSTRAINT "MuscleGroup_categoryId_fkey";

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "programId";

-- AlterTable
ALTER TABLE "MuscleGroup" DROP COLUMN "categoryId";

-- AlterTable
ALTER TABLE "Program" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Progress" DROP COLUMN "bestSet",
ADD COLUMN     "bestSetId" INTEGER;

-- AlterTable
ALTER TABLE "SetTemplate" ADD COLUMN     "restTime" INTEGER,
DROP COLUMN "type",
ADD COLUMN     "type" "SetType" NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "WorkoutExercise" ADD COLUMN     "notes" TEXT,
ADD COLUMN     "order" INTEGER;

-- AlterTable
ALTER TABLE "WorkoutSet" ADD COLUMN     "restTime" INTEGER,
ALTER COLUMN "performedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_bestSetId_fkey" FOREIGN KEY ("bestSetId") REFERENCES "WorkoutSet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
