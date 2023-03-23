/*
  Warnings:

  - You are about to drop the column `prompt` on the `Post` table. All the data in the column will be lost.
  - Added the required column `comment` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "prompt",
ADD COLUMN     "comment" VARCHAR(255) NOT NULL;
