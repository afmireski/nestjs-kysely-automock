/*
  Warnings:

  - You are about to drop the `ProductPrice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductPrice" DROP CONSTRAINT "ProductPrice_product_id_fkey";

-- DropTable
DROP TABLE "ProductPrice";

-- CreateTable
CREATE TABLE "product_prices" (
    "product_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value" INTEGER NOT NULL,

    CONSTRAINT "product_prices_pkey" PRIMARY KEY ("product_id","created_at")
);

-- AddForeignKey
ALTER TABLE "product_prices" ADD CONSTRAINT "product_prices_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
