-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "shop" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    "scope" TEXT,
    "expires" DATETIME,
    "accessToken" TEXT NOT NULL,
    "userId" BIGINT
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createDate" DATETIME NOT NULL,
    "updateDate" DATETIME NOT NULL,
    "sku" TEXT NOT NULL,
    "section" TEXT,
    "unitsPerCarton" INTEGER,
    "float" TEXT,
    "posQuantity" BIGINT,
    "restock" BIGINT,
    "actualRestock" BIGINT
);
