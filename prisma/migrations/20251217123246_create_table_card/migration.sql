-- CreateTable
CREATE TABLE "Card" (
    "id" UUID NOT NULL,
    "frontLanguage" TEXT NOT NULL,
    "frontItem" TEXT NOT NULL,
    "frontPronunciation" TEXT,
    "frontExample" TEXT,
    "frontStatus" INTEGER NOT NULL,
    "frontDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "backLanguage" TEXT NOT NULL,
    "backItem" TEXT NOT NULL,
    "backPronunciation" TEXT,
    "backExample" TEXT,
    "backStatus" INTEGER NOT NULL,
    "backDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);
