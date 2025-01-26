/*
  Warnings:

  - A unique constraint covering the columns `[numero]` on the table `Arcano` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Arcano_numero_key" ON "Arcano"("numero");
