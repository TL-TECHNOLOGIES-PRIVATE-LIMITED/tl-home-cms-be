BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Otp] (
    [id] INT NOT NULL IDENTITY(1,1),
    [email] NVARCHAR(1000) NOT NULL,
    [otp] NVARCHAR(1000) NOT NULL,
    [isVerified] BIT NOT NULL CONSTRAINT [Otp_isVerified_df] DEFAULT 0,
    [expiresAt] DATETIME2 NOT NULL,
    CONSTRAINT [Otp_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Otp_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Otp_email_idx] ON [dbo].[Otp]([email]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
