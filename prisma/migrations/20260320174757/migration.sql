-- CreateEnum
CREATE TYPE "AnimalSize" AS ENUM ('Pequeno', 'Medio', 'Grande');

-- CreateEnum
CREATE TYPE "AnimalSex" AS ENUM ('Macho', 'Femea');

-- CreateEnum
CREATE TYPE "AnimalStatus" AS ENUM ('Disponivel', 'Adotado');

-- CreateTable
CREATE TABLE "AnimalType" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AnimalType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Animal" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "typeId" INTEGER NOT NULL,
    "breed" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "description" TEXT,
    "story" TEXT,
    "behavior" TEXT,
    "vaccines" TEXT[],
    "size" "AnimalSize" NOT NULL,
    "sex" "AnimalSex" NOT NULL,
    "photos" TEXT[],
    "status" "AnimalStatus" NOT NULL DEFAULT 'Disponivel',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Animal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdoptionLog" (
    "id" TEXT NOT NULL,
    "animalId" TEXT NOT NULL,
    "adopterName" TEXT NOT NULL,
    "adopterCpf" TEXT NOT NULL,
    "adopterPhone" TEXT NOT NULL,
    "adopterEmail" TEXT NOT NULL,
    "adoptedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdoptionLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AnimalType_label_key" ON "AnimalType"("label");

-- CreateIndex
CREATE UNIQUE INDEX "AdoptionLog_animalId_key" ON "AdoptionLog"("animalId");

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "AnimalType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdoptionLog" ADD CONSTRAINT "AdoptionLog_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
