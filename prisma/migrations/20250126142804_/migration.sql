-- CreateTable
CREATE TABLE "Arcano" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numero" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "imagem_url" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "AnoPessoal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ano" INTEGER NOT NULL,
    "cor" TEXT NOT NULL,
    "descricao" TEXT NOT NULL
);
