/*
  Warnings:

  - You are about to drop the `_CommentToPost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "_CommentToPost_B_index";

-- DropIndex
DROP INDEX "_CommentToPost_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_CommentToPost";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Comment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userImage" TEXT NOT NULL DEFAULT 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg',
    "userName" TEXT NOT NULL,
    "commentText" TEXT NOT NULL,
    "postId" INTEGER,
    CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Comment" ("commentText", "id", "userImage", "userName") SELECT "commentText", "id", "userImage", "userName" FROM "Comment";
DROP TABLE "Comment";
ALTER TABLE "new_Comment" RENAME TO "Comment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
