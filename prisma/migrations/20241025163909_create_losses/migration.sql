-- CreateTable
CREATE TABLE "losses" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "store_id" TEXT NOT NULL,

    CONSTRAINT "losses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "losses_store_id_date_key" ON "losses"("store_id", "date");

-- AddForeignKey
ALTER TABLE "losses" ADD CONSTRAINT "losses_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
