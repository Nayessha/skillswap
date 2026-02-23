-- CreateTable
CREATE TABLE "WantedSkill" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WantedSkill_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WantedSkill" ADD CONSTRAINT "WantedSkill_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
