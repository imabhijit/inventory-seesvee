-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "create_date" DATETIME,
    "update_date" DATETIME,
    "sku" TEXT NOT NULL,
    "section" TEXT,
    "units_per_carton" INT,
    "float" TEXT,
    "pos_quantity" BIGINT,
    "restock" BIGINT,
    "actual_restock" BIGINT,
    "expiry_dates" JSON
);
