-- CreateTable
CREATE TABLE "Apartment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "location" TEXT NOT NULL,
    "amenities" TEXT[],
    "images" TEXT[],

    CONSTRAINT "Apartment_pkey" PRIMARY KEY ("id")
);
