BEGIN TRY

BEGIN TRAN;

-- CreateIndex
CREATE NONCLUSTERED INDEX [Blog_date_idx] ON [dbo].[Blog]([date]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Blog_author_idx] ON [dbo].[Blog]([author]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Blog_createdAt_idx] ON [dbo].[Blog]([createdAt]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Catalogue_category_idx] ON [dbo].[Catalogue]([category]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Catalogue_isActive_idx] ON [dbo].[Catalogue]([isActive]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Catalogue_order_idx] ON [dbo].[Catalogue]([order]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Enquiries_email_idx] ON [dbo].[Enquiries]([email]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Enquiries_status_idx] ON [dbo].[Enquiries]([status]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Enquiries_createdAt_idx] ON [dbo].[Enquiries]([createdAt]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Team_isActive_idx] ON [dbo].[Team]([isActive]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Team_order_idx] ON [dbo].[Team]([order]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Team_email_idx] ON [dbo].[Team]([email]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
