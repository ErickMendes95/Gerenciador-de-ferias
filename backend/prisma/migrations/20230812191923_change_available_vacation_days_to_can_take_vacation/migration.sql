/*
  Warnings:

  - You are about to drop the column `availableVacationDays` on the `Employee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "availableVacationDays",
ADD COLUMN     "canTakeVacation" BOOLEAN NOT NULL DEFAULT false;
