BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Blog] (
    [id] NVARCHAR(1000) NOT NULL,
    [title] NVARCHAR(1000) NOT NULL,
    [author] NVARCHAR(1000) NOT NULL,
    [date] DATETIME2 NOT NULL,
    [image] NVARCHAR(1000) NOT NULL,
    [excerpt] TEXT NOT NULL,
    [content] TEXT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Blog_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Blog_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Catalogue] (
    [id] NVARCHAR(1000) NOT NULL,
    [title] NVARCHAR(1000) NOT NULL,
    [description] TEXT NOT NULL,
    [image] NVARCHAR(1000) NOT NULL,
    [file] NVARCHAR(1000),
    [category] NVARCHAR(1000),
    [isActive] BIT NOT NULL CONSTRAINT [Catalogue_isActive_df] DEFAULT 1,
    [order] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Catalogue_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Catalogue_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Client] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [logo] NVARCHAR(1000) NOT NULL,
    [website] NVARCHAR(1000),
    [description] TEXT,
    [isActive] BIT NOT NULL CONSTRAINT [Client_isActive_df] DEFAULT 1,
    [order] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Client_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Client_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Contact] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [phoneNumber] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [message] TEXT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Contact_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Contact_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ContactInfo] (
    [id] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [phone] NVARCHAR(1000) NOT NULL,
    [address] TEXT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [ContactInfo_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [ContactInfo_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[FAQ] (
    [id] NVARCHAR(1000) NOT NULL,
    [question] TEXT NOT NULL,
    [answer] TEXT NOT NULL,
    [order] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [FAQ_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [FAQ_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[GoogleAnalytics] (
    [id] NVARCHAR(1000) NOT NULL,
    [trackingId] NVARCHAR(1000) NOT NULL,
    [propertyId] NVARCHAR(1000) NOT NULL,
    [viewId] NVARCHAR(1000),
    [apiKey] NVARCHAR(1000),
    [isActive] BIT NOT NULL CONSTRAINT [GoogleAnalytics_isActive_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [GoogleAnalytics_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [GoogleAnalytics_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Newsletter] (
    [id] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Newsletter_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Newsletter_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Newsletter_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[PrivacyPolicy] (
    [id] NVARCHAR(1000) NOT NULL,
    [title] NVARCHAR(1000) NOT NULL,
    [content] TEXT NOT NULL,
    [order] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [PrivacyPolicy_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [PrivacyPolicy_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Team] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [position] NVARCHAR(1000) NOT NULL,
    [image] NVARCHAR(1000) NOT NULL,
    [bio] TEXT NOT NULL,
    [linkedin] NVARCHAR(1000),
    [email] NVARCHAR(1000),
    [isActive] BIT NOT NULL CONSTRAINT [Team_isActive_df] DEFAULT 1,
    [order] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Team_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Team_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Testimonial] (
    [id] NVARCHAR(1000) NOT NULL,
    [text] TEXT NOT NULL,
    [author] NVARCHAR(1000) NOT NULL,
    [position] NVARCHAR(1000) NOT NULL,
    [rating] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Testimonial_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Testimonial_pkey] PRIMARY KEY CLUSTERED ([id])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
