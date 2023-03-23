/*
  Warnings:

  - You are about to drop the column `content` on the `Post` table. All the data in the column will be lost.
  - Added the required column `prompt` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `response` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "likes" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "comment" SET DATA TYPE VARCHAR(300);

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "content",
ADD COLUMN     "likes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "prompt" TEXT NOT NULL,
ADD COLUMN     "response" TEXT NOT NULL,
ALTER COLUMN "comment" SET DATA TYPE VARCHAR(300);
