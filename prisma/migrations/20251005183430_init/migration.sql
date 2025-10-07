-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dateOfBirth" TEXT NOT NULL,
    "whenWeMet" TEXT NOT NULL,
    "school" TEXT,
    "professionText" TEXT,
    "professions" TEXT NOT NULL,
    "contacts" TEXT NOT NULL,
    "socialMedia" TEXT NOT NULL,
    "comments" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "Contact_userId_idx" ON "Contact"("userId");
