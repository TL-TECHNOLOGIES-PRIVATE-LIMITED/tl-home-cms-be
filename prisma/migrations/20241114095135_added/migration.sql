/*
  Warnings:

  - A unique constraint covering the columns `[unSubscribeToken]` on the table `Newsletter` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `unSubscribeToken` to the `Newsletter` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Newsletter] ADD [unSubscribeToken] NVARCHAR(1000) NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[Newsletter] ADD CONSTRAINT [Newsletter_unSubscribeToken_key] UNIQUE NONCLUSTERED ([unSubscribeToken]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
