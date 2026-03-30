-- DropForeignKey
ALTER TABLE "AdoptionLog" DROP CONSTRAINT "AdoptionLog_animalId_fkey";

-- DropForeignKey
ALTER TABLE "Animal" DROP CONSTRAINT "Animal_typeId_fkey";

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "AnimalType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdoptionLog" ADD CONSTRAINT "AdoptionLog_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
