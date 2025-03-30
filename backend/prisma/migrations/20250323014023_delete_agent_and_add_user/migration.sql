/*
  Warnings:

  - You are about to drop the `Agent` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('AGENT', 'HELPER');

-- DropTable
DROP TABLE "Agent";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(50),
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(100),
    "provider" VARCHAR(50),
    "providerId" VARCHAR(100),
    "verificationCode" VARCHAR(4),
    "verificationExpires" TIMESTAMP(3),
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_providerId_key" ON "User"("providerId");
