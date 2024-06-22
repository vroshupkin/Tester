/*
  Warnings:

  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Test";

-- CreateTable
CREATE TABLE "UserRole" (
    "userId" INTEGER NOT NULL,
    "role" TEXT[],

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Tests" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "testCasesId" INTEGER,

    CONSTRAINT "Tests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestCases" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "testId" INTEGER[],

    CONSTRAINT "TestCases_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TestCases_name_key" ON "TestCases"("name");

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tests" ADD CONSTRAINT "Tests_testCasesId_fkey" FOREIGN KEY ("testCasesId") REFERENCES "TestCases"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestCases" ADD CONSTRAINT "TestCases_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
