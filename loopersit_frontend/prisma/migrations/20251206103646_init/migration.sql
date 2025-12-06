-- CreateTable
CREATE TABLE "services" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" VARCHAR(500),
    "home_icon" VARCHAR(500),
    "order" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_offers" (
    "id" SERIAL NOT NULL,
    "service_id" INTEGER NOT NULL,
    "offer" VARCHAR(250) NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_offers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sub_services" (
    "id" SERIAL NOT NULL,
    "service_id" INTEGER NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" VARCHAR(500),
    "order" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sub_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "designation" VARCHAR(250),
    "image" VARCHAR(500),
    "review" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pages" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "slug" VARCHAR(50) NOT NULL,
    "link_on_footer" BOOLEAN NOT NULL DEFAULT false,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pricing" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "price_range" VARCHAR(50) NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pricing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "price_features" (
    "id" SERIAL NOT NULL,
    "pricing_id" INTEGER NOT NULL,
    "feature" VARCHAR(250) NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "price_features_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "services_slug_key" ON "services"("slug");

-- CreateIndex
CREATE INDEX "services_order_idx" ON "services"("order");

-- CreateIndex
CREATE INDEX "service_offers_order_idx" ON "service_offers"("order");

-- CreateIndex
CREATE INDEX "service_offers_service_id_idx" ON "service_offers"("service_id");

-- CreateIndex
CREATE INDEX "sub_services_order_idx" ON "sub_services"("order");

-- CreateIndex
CREATE INDEX "sub_services_service_id_idx" ON "sub_services"("service_id");

-- CreateIndex
CREATE INDEX "reviews_order_idx" ON "reviews"("order");

-- CreateIndex
CREATE UNIQUE INDEX "pages_slug_key" ON "pages"("slug");

-- CreateIndex
CREATE INDEX "pricing_order_idx" ON "pricing"("order");

-- CreateIndex
CREATE INDEX "price_features_order_idx" ON "price_features"("order");

-- CreateIndex
CREATE INDEX "price_features_pricing_id_idx" ON "price_features"("pricing_id");

-- AddForeignKey
ALTER TABLE "service_offers" ADD CONSTRAINT "service_offers_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_services" ADD CONSTRAINT "sub_services_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "price_features" ADD CONSTRAINT "price_features_pricing_id_fkey" FOREIGN KEY ("pricing_id") REFERENCES "pricing"("id") ON DELETE CASCADE ON UPDATE CASCADE;
