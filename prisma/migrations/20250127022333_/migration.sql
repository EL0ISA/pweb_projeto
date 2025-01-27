/*
  Warnings:

  - A unique constraint covering the columns `[ano]` on the table `AnoPessoal` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AnoPessoal_ano_key" ON "AnoPessoal"("ano");
