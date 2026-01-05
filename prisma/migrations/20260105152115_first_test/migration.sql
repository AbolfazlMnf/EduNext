-- CreateTable
CREATE TABLE "Products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" DOUBLE PRECISION DEFAULT 0.0,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);
