-- CreateEnum
CREATE TYPE "MemberRole" AS ENUM ('leader', 'member');

-- CreateTable
CREATE TABLE "faqs" (
    "id" SERIAL NOT NULL,
    "question" VARCHAR(250) NOT NULL,
    "answer" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "faqs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "members" (
    "id" SERIAL NOT NULL,
    "role" "MemberRole" NOT NULL DEFAULT 'member',
    "name" VARCHAR(150) NOT NULL,
    "image" VARCHAR(500),
    "designation" VARCHAR(250),
    "linkedin" VARCHAR(500),
    "github" VARCHAR(500),
    "facebook" VARCHAR(500),
    "order" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_summaries" (
    "id" SERIAL NOT NULL,
    "figure" VARCHAR(10) NOT NULL,
    "detail" VARCHAR(250) NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_summaries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portfolios" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(250) NOT NULL,
    "image" VARCHAR(500),
    "duration" VARCHAR(50) NOT NULL,
    "detail" TEXT NOT NULL,
    "link" VARCHAR(500),
    "order" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "portfolios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "faqs_order_idx" ON "faqs"("order");

-- CreateIndex
CREATE INDEX "members_order_idx" ON "members"("order");

-- CreateIndex
CREATE INDEX "project_summaries_order_idx" ON "project_summaries"("order");

-- CreateIndex
CREATE INDEX "portfolios_order_idx" ON "portfolios"("order");
