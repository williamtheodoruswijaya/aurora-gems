-- CreateEnum
CREATE TYPE "BalanceType" AS ENUM ('DEPOSIT', 'WITHDRAW', 'TRANSACTION');

-- CreateTable
CREATE TABLE "Balance" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Balance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BalanceHistory" (
    "id" SERIAL NOT NULL,
    "balanceId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "type" "BalanceType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BalanceHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Balance" ADD CONSTRAINT "Balance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BalanceHistory" ADD CONSTRAINT "BalanceHistory_balanceId_fkey" FOREIGN KEY ("balanceId") REFERENCES "Balance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
