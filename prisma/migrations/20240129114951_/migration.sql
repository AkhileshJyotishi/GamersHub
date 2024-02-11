-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('MOD', 'ADMIN');

-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('ACCESS', 'REFRESH', 'RESET_PASSWORD', 'VERIFY_EMAIL');

-- CreateEnum
CREATE TYPE "ProviderType" AS ENUM ('GOOGLE', 'FACEBOOK');

-- CreateEnum
CREATE TYPE "DeveloperType" AS ENUM ('indie', 'studio', 'collaboration');

-- CreateEnum
CREATE TYPE "GameMode" AS ENUM ('singlePlayer', 'multiPlayer');

-- CreateEnum
CREATE TYPE "ReportType" AS ENUM ('post', 'asset', 'user', 'marketplace', 'tutorials', 'others', 'game', 'job');

-- CreateEnum
CREATE TYPE "Expertise" AS ENUM ('ENTRY', 'INTERMEDIATE', 'EXPERT');

-- CreateEnum
CREATE TYPE "JobPaymentType" AS ENUM ('FIXED', 'HOURLY', 'NEGOTIABLE');

-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('FREELANCE', 'FULL_TIME', 'COLLAB');

-- CreateEnum
CREATE TYPE "ApplicationMethod" AS ENUM ('MANUAL', 'GCH');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT,
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "profileImage" TEXT,
    "bannerImage" TEXT,
    "matureContent" BOOLEAN NOT NULL DEFAULT false,
    "validUser" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserDetails" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "country" TEXT,
    "city" TEXT,
    "userBio" TEXT,
    "resume" TEXT,

    CONSTRAINT "UserDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserEducation" (
    "id" SERIAL NOT NULL,
    "university" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "startingDate" TIMESTAMP(3) NOT NULL,
    "endingDate" TIMESTAMP(3),
    "description" TEXT,
    "userDetailsId" INTEGER NOT NULL,

    CONSTRAINT "UserEducation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserExperience" (
    "id" SERIAL NOT NULL,
    "role" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "startingDate" TIMESTAMP(3) NOT NULL,
    "endingDate" TIMESTAMP(3),
    "presentWorking" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "userDetailsId" INTEGER NOT NULL,

    CONSTRAINT "UserExperience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSocials" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "twitter" TEXT,
    "facebook" TEXT,
    "linkedin" TEXT,
    "youtube" TEXT,
    "github" TEXT,
    "portfolio" TEXT,
    "artstation" TEXT,

    CONSTRAINT "UserSocials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "role" "RoleType",

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "type" "TokenType" NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "blacklisted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Provider" (
    "id" SERIAL NOT NULL,
    "data" JSONB NOT NULL,
    "providerType" "ProviderType" NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Provider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Album" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "banner" TEXT,
    "userId" INTEGER NOT NULL,
    "slug" TEXT,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "slug" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "banner" TEXT,
    "matureContent" BOOLEAN NOT NULL DEFAULT false,
    "content" JSONB NOT NULL,
    "albumId" INTEGER,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostLikes" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "PostLikes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostComment" (
    "id" SERIAL NOT NULL,
    "comment" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PostComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" JSONB,
    "banner" TEXT,
    "developerId" INTEGER,
    "gameMode" "GameMode",
    "gameAssets" TEXT[],
    "releaseDate" TIMESTAMP(3),
    "userId" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameDeveloper" (
    "id" SERIAL NOT NULL,
    "developerName" TEXT,
    "developerType" "DeveloperType",

    CONSTRAINT "GameDeveloper_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "type" "ReportType" NOT NULL,
    "description" TEXT,
    "subject" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "what" INTEGER,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HelpQuestion" (
    "id" SERIAL NOT NULL,
    "solution" TEXT,
    "question" TEXT NOT NULL,
    "helpCategoryId" INTEGER NOT NULL,

    CONSTRAINT "HelpQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HelpCategory" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "order" INTEGER[],
    "position" INTEGER NOT NULL,

    CONSTRAINT "HelpCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "slug" TEXT,
    "banner" TEXT,
    "publishDate" TIMESTAMP(3),
    "title" TEXT NOT NULL,
    "description" TEXT,
    "jobDetails" JSONB,
    "aboutRecruiter" JSONB,
    "remote" BOOLEAN NOT NULL,
    "country" TEXT,
    "city" TEXT,
    "jobApplyUrl" TEXT,
    "isExpired" BOOLEAN NOT NULL DEFAULT false,
    "expertise" "Expertise",
    "paymentType" "JobPaymentType" NOT NULL,
    "paymentValue" DOUBLE PRECISION,
    "jobType" "JobType" NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobApplication" (
    "id" SERIAL NOT NULL,
    "rolesApplied" TEXT[],
    "applyMethod" "ApplicationMethod" NOT NULL,
    "userId" INTEGER NOT NULL,
    "jobId" INTEGER NOT NULL,
    "resume" TEXT,
    "motivationToApply" TEXT NOT NULL,

    CONSTRAINT "JobApplication_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "skill" TEXT NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Software" (
    "id" SERIAL NOT NULL,
    "software" TEXT NOT NULL,

    CONSTRAINT "Software_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RolesNeeded" (
    "id" SERIAL NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "RolesNeeded_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Platform" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Platform_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Keyword" (
    "id" SERIAL NOT NULL,
    "keyword" TEXT NOT NULL,

    CONSTRAINT "Keyword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "News" (
    "id" SERIAL NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "content" JSONB,
    "bannerImage" TEXT,
    "publishedAt" TIMESTAMP(3),
    "isSaved" BOOLEAN NOT NULL DEFAULT true,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsCategory" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "NewsCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FollowUsers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_AlbumKeywords" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_SkillToPosts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_SavedPosts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_UserLikesToPosts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_GenreToGames" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_gamePlatforms" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_distributionPlatforms" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_GameKeywords" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_SavedGames" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_SoftwareToJobs" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_RolesToJobs" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_SavedJobs" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_AppliedUsers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_SkillToUserDetails" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_SoftwareToUserDetails" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_PostKeywords" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "UserDetails_userId_key" ON "UserDetails"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserSocials_userId_key" ON "UserSocials"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Role_userId_key" ON "Role"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Provider_userId_key" ON "Provider"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PostLikes_postId_key" ON "PostLikes"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "Game_developerId_key" ON "Game"("developerId");

-- CreateIndex
CREATE UNIQUE INDEX "Report_userId_key" ON "Report"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ApplicantInfo_applicationId_key" ON "ApplicantInfo"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_skill_key" ON "Skill"("skill");

-- CreateIndex
CREATE UNIQUE INDEX "Software_software_key" ON "Software"("software");

-- CreateIndex
CREATE UNIQUE INDEX "RolesNeeded_role_key" ON "RolesNeeded"("role");

-- CreateIndex
CREATE UNIQUE INDEX "Platform_name_key" ON "Platform"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_name_key" ON "Genre"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Keyword_keyword_key" ON "Keyword"("keyword");

-- CreateIndex
CREATE UNIQUE INDEX "_FollowUsers_AB_unique" ON "_FollowUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_FollowUsers_B_index" ON "_FollowUsers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AlbumKeywords_AB_unique" ON "_AlbumKeywords"("A", "B");

-- CreateIndex
CREATE INDEX "_AlbumKeywords_B_index" ON "_AlbumKeywords"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SkillToPosts_AB_unique" ON "_SkillToPosts"("A", "B");

-- CreateIndex
CREATE INDEX "_SkillToPosts_B_index" ON "_SkillToPosts"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SavedPosts_AB_unique" ON "_SavedPosts"("A", "B");

-- CreateIndex
CREATE INDEX "_SavedPosts_B_index" ON "_SavedPosts"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserLikesToPosts_AB_unique" ON "_UserLikesToPosts"("A", "B");

-- CreateIndex
CREATE INDEX "_UserLikesToPosts_B_index" ON "_UserLikesToPosts"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GenreToGames_AB_unique" ON "_GenreToGames"("A", "B");

-- CreateIndex
CREATE INDEX "_GenreToGames_B_index" ON "_GenreToGames"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_gamePlatforms_AB_unique" ON "_gamePlatforms"("A", "B");

-- CreateIndex
CREATE INDEX "_gamePlatforms_B_index" ON "_gamePlatforms"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_distributionPlatforms_AB_unique" ON "_distributionPlatforms"("A", "B");

-- CreateIndex
CREATE INDEX "_distributionPlatforms_B_index" ON "_distributionPlatforms"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GameKeywords_AB_unique" ON "_GameKeywords"("A", "B");

-- CreateIndex
CREATE INDEX "_GameKeywords_B_index" ON "_GameKeywords"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SavedGames_AB_unique" ON "_SavedGames"("A", "B");

-- CreateIndex
CREATE INDEX "_SavedGames_B_index" ON "_SavedGames"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SoftwareToJobs_AB_unique" ON "_SoftwareToJobs"("A", "B");

-- CreateIndex
CREATE INDEX "_SoftwareToJobs_B_index" ON "_SoftwareToJobs"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RolesToJobs_AB_unique" ON "_RolesToJobs"("A", "B");

-- CreateIndex
CREATE INDEX "_RolesToJobs_B_index" ON "_RolesToJobs"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SavedJobs_AB_unique" ON "_SavedJobs"("A", "B");

-- CreateIndex
CREATE INDEX "_SavedJobs_B_index" ON "_SavedJobs"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AppliedUsers_AB_unique" ON "_AppliedUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_AppliedUsers_B_index" ON "_AppliedUsers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SkillToUserDetails_AB_unique" ON "_SkillToUserDetails"("A", "B");

-- CreateIndex
CREATE INDEX "_SkillToUserDetails_B_index" ON "_SkillToUserDetails"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SoftwareToUserDetails_AB_unique" ON "_SoftwareToUserDetails"("A", "B");

-- CreateIndex
CREATE INDEX "_SoftwareToUserDetails_B_index" ON "_SoftwareToUserDetails"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PostKeywords_AB_unique" ON "_PostKeywords"("A", "B");

-- CreateIndex
CREATE INDEX "_PostKeywords_B_index" ON "_PostKeywords"("B");

-- AddForeignKey
ALTER TABLE "UserDetails" ADD CONSTRAINT "UserDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserEducation" ADD CONSTRAINT "UserEducation_userDetailsId_fkey" FOREIGN KEY ("userDetailsId") REFERENCES "UserDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserExperience" ADD CONSTRAINT "UserExperience_userDetailsId_fkey" FOREIGN KEY ("userDetailsId") REFERENCES "UserDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSocials" ADD CONSTRAINT "UserSocials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Provider" ADD CONSTRAINT "Provider_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostLikes" ADD CONSTRAINT "PostLikes_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostComment" ADD CONSTRAINT "PostComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostComment" ADD CONSTRAINT "PostComment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "GameDeveloper"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HelpQuestion" ADD CONSTRAINT "HelpQuestion_helpCategoryId_fkey" FOREIGN KEY ("helpCategoryId") REFERENCES "HelpCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicantInfo" ADD CONSTRAINT "ApplicantInfo_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "JobApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "News" ADD CONSTRAINT "News_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "NewsCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "News" ADD CONSTRAINT "News_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FollowUsers" ADD CONSTRAINT "_FollowUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FollowUsers" ADD CONSTRAINT "_FollowUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlbumKeywords" ADD CONSTRAINT "_AlbumKeywords_A_fkey" FOREIGN KEY ("A") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlbumKeywords" ADD CONSTRAINT "_AlbumKeywords_B_fkey" FOREIGN KEY ("B") REFERENCES "Keyword"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SkillToPosts" ADD CONSTRAINT "_SkillToPosts_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SkillToPosts" ADD CONSTRAINT "_SkillToPosts_B_fkey" FOREIGN KEY ("B") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SavedPosts" ADD CONSTRAINT "_SavedPosts_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SavedPosts" ADD CONSTRAINT "_SavedPosts_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserLikesToPosts" ADD CONSTRAINT "_UserLikesToPosts_A_fkey" FOREIGN KEY ("A") REFERENCES "PostLikes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserLikesToPosts" ADD CONSTRAINT "_UserLikesToPosts_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToGames" ADD CONSTRAINT "_GenreToGames_A_fkey" FOREIGN KEY ("A") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToGames" ADD CONSTRAINT "_GenreToGames_B_fkey" FOREIGN KEY ("B") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_gamePlatforms" ADD CONSTRAINT "_gamePlatforms_A_fkey" FOREIGN KEY ("A") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_gamePlatforms" ADD CONSTRAINT "_gamePlatforms_B_fkey" FOREIGN KEY ("B") REFERENCES "Platform"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_distributionPlatforms" ADD CONSTRAINT "_distributionPlatforms_A_fkey" FOREIGN KEY ("A") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_distributionPlatforms" ADD CONSTRAINT "_distributionPlatforms_B_fkey" FOREIGN KEY ("B") REFERENCES "Platform"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameKeywords" ADD CONSTRAINT "_GameKeywords_A_fkey" FOREIGN KEY ("A") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameKeywords" ADD CONSTRAINT "_GameKeywords_B_fkey" FOREIGN KEY ("B") REFERENCES "Keyword"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SavedGames" ADD CONSTRAINT "_SavedGames_A_fkey" FOREIGN KEY ("A") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SavedGames" ADD CONSTRAINT "_SavedGames_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SoftwareToJobs" ADD CONSTRAINT "_SoftwareToJobs_A_fkey" FOREIGN KEY ("A") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SoftwareToJobs" ADD CONSTRAINT "_SoftwareToJobs_B_fkey" FOREIGN KEY ("B") REFERENCES "Software"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RolesToJobs" ADD CONSTRAINT "_RolesToJobs_A_fkey" FOREIGN KEY ("A") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RolesToJobs" ADD CONSTRAINT "_RolesToJobs_B_fkey" FOREIGN KEY ("B") REFERENCES "RolesNeeded"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SavedJobs" ADD CONSTRAINT "_SavedJobs_A_fkey" FOREIGN KEY ("A") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SavedJobs" ADD CONSTRAINT "_SavedJobs_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AppliedUsers" ADD CONSTRAINT "_AppliedUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AppliedUsers" ADD CONSTRAINT "_AppliedUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SkillToUserDetails" ADD CONSTRAINT "_SkillToUserDetails_A_fkey" FOREIGN KEY ("A") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SkillToUserDetails" ADD CONSTRAINT "_SkillToUserDetails_B_fkey" FOREIGN KEY ("B") REFERENCES "UserDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SoftwareToUserDetails" ADD CONSTRAINT "_SoftwareToUserDetails_A_fkey" FOREIGN KEY ("A") REFERENCES "Software"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SoftwareToUserDetails" ADD CONSTRAINT "_SoftwareToUserDetails_B_fkey" FOREIGN KEY ("B") REFERENCES "UserDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostKeywords" ADD CONSTRAINT "_PostKeywords_A_fkey" FOREIGN KEY ("A") REFERENCES "Keyword"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostKeywords" ADD CONSTRAINT "_PostKeywords_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
