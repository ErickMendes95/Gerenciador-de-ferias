/*
  Warnings:

  - You are about to drop the column `lastVacationDate` on the `Employee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "lastVacationDate",
ADD COLUMN     "lastCanTakeVacationUpdate" TIMESTAMP(3);
