/*
  Warnings:

  - Added the required column `applyMethod` to the `JobApplication` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ApplicationMethod" AS ENUM ('MANUAL', 'GCH');

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "isExpired" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "jobApplyUrl" TEXT;

-- AlterTable
ALTER TABLE "JobApplication" ADD COLUMN     "applyMethod" "ApplicationMethod" NOT NULL,
ADD COLUMN     "rolesApplied" TEXT[];

-- CreateTable
CREATE TABLE "ApplicantInfo" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "country" TEXT,
    "city" TEXT,
    "bio" TEXT,
    "portfolio" TEXT,
    "skills" TEXT[],
    "applicationId" INTEGER NOT NULL,

    CONSTRAINT "ApplicantInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RolesNeeded" (
    "id" SERIAL NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "RolesNeeded_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RolesToJobs" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_AppliedUsers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ApplicantInfo_applicationId_key" ON "ApplicantInfo"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "RolesNeeded_role_key" ON "RolesNeeded"("role");

-- CreateIndex
CREATE UNIQUE INDEX "_RolesToJobs_AB_unique" ON "_RolesToJobs"("A", "B");

-- CreateIndex
CREATE INDEX "_RolesToJobs_B_index" ON "_RolesToJobs"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AppliedUsers_AB_unique" ON "_AppliedUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_AppliedUsers_B_index" ON "_AppliedUsers"("B");

-- AddForeignKey
ALTER TABLE "ApplicantInfo" ADD CONSTRAINT "ApplicantInfo_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "JobApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RolesToJobs" ADD CONSTRAINT "_RolesToJobs_A_fkey" FOREIGN KEY ("A") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RolesToJobs" ADD CONSTRAINT "_RolesToJobs_B_fkey" FOREIGN KEY ("B") REFERENCES "RolesNeeded"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AppliedUsers" ADD CONSTRAINT "_AppliedUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AppliedUsers" ADD CONSTRAINT "_AppliedUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
