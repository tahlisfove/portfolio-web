/*
  Warnings:

  - A unique constraint covering the columns `[title,link]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Project_title_link_key" ON "Project"("title", "link");
