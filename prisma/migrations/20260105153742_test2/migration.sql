/*
  Warnings:

  - Added the required column `description` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `category` on the `Products` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "productCategory" AS ENUM ('next', 'react', 'vue', 'ang');

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "description" TEXT NOT NULL,
DROP COLUMN "category",
ADD COLUMN     "category" "productCategory" NOT NULL;
