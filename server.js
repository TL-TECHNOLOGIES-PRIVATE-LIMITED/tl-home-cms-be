import express from "express";
import 'dotenv/config';
import cors from "cors";
import { app,  server } from './socket/socket.js'

// admin routes
import authRoutes from "./routes/admin/auth.routes.js";
import adminBlogRoutes from "./routes/admin/blog.routes.js";
import adminEnquiriesRoutes from "./routes/admin/enquiries.routes.js";
import adminContentsRoutes from "./routes/admin/contents.routes.js";
import adminTeamRoutes from "./routes/admin/team.routes.js";
import adminQnaRoutes from "./routes/admin/qna.routes.js";
import adminClientRoutes from "./routes/admin/client.routes.js";
import adminCatalogueRoutes from "./routes/admin/catalogue.routes.js";
import adminNewsletterRoutes from "./routes/admin/newsletter.routes.js";
import adminSocialRoutes from "./routes/admin/social.routes.js";
import adminStatRoutes from "./routes/admin/stat.routes.js";
import adminEmailConfigRoutes from "./routes/admin/emailConfig.routes.js";
import adminNotificationRoutes from "./routes/admin/notification.routes.js";


// web routes
import webBlogRoutes from "./routes/web/blog.routes.js";
import webEnquiriesRoutes from "./routes/web/enquiries.routes.js";
import webContentsRoutes from "./routes/web/contents.routes.js";
import webTeamRoutes from "./routes/web/team.routes.js";
import webQnaRoutes from "./routes/web/qna.routes.js";
import webClientRoutes from "./routes/web/client.routes.js";
import webCatalogueRoutes from "./routes/web/catalogue.routes.js";
import webNewsletterRoutes from "./routes/web/newsletter.routes.js";
import webSocialRoutes from "./routes/web/social.routes.js";


const PORT = process.env.PORT;


app.use(cors('*')); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// admin routes
app.use("/api/v1/admin/auth", authRoutes);
app.use("/api/v1/admin/blog", adminBlogRoutes);
app.use("/api/v1/admin/team", adminTeamRoutes);
app.use("/api/v1/admin/enquiries", adminEnquiriesRoutes);
app.use("/api/v1/admin/contents", adminContentsRoutes);
app.use("/api/v1/admin/client", adminClientRoutes);
app.use("/api/v1/admin/qna", adminQnaRoutes);
app.use("/api/v1/admin/catalogue", adminCatalogueRoutes);
app.use("/api/v1/admin/newsletter", adminNewsletterRoutes);
app.use('/api/v1/admin/social', adminSocialRoutes);
app.use('/api/v1/admin/config', adminEmailConfigRoutes)
app.use('/api/v1/admin/notification', adminNotificationRoutes)



//admin stats

app.use("/api/v1/admin/stats", adminStatRoutes);


//web routes

app.use("/api/v1/web/blog", webBlogRoutes);
app.use("/api/v1/web/team", webTeamRoutes);
app.use("/api/v1/web/enquiries", webEnquiriesRoutes);
app.use("/api/v1/web/contents", webContentsRoutes);
app.use("/api/v1/web/client", webClientRoutes);
app.use("/api/v1/web/qna", webQnaRoutes);
app.use("/api/v1/web/catalogue", webCatalogueRoutes);
app.use("/api/v1/web/newsletter", webNewsletterRoutes);
app.use('/api/v1/web/social', webSocialRoutes);






app.get("/", (req, res) => {
  res.send("SCF RUNNING");
});

server.listen(PORT , () => {
  console.log(`Server is running on port  http://localhost:${PORT}`);
});



// <======================================== NOTES START ==============================================>


  //framework :  "express" for server
  // libraries :  "express" for server , "argon2" for password hashing , "jsonwebtoken" for jwt , "prisma" for database
  // Read the documentaion in their respective sites for the above mentioned libraries before making changes in the code.
  // To run the code: npm start
  // First install all dependencies :- npm intsall
  // Then run the code :- npm start

  // created date : 11-NOV-2024 || created by : Murthasa Ali  || module : 1 ||

  // Technical summary(Pre-setups) created date/by :  Gurudas P R ||
  // Domain :   || 
  // Hosting :   ||
  // SSL :   ||
  // Database :  || Thasleem

  // Phase summary :   || created date/by :  Ali  || Gurudas P R || Thasleem ||
  // Phase 1 :  SetUps || Gurudas
  // Phase 2 :  Development/ Api Creation| Gurudas || Thasleem
  // Phase 3 :  Production  ||

  // <======================================== NOTES END ==============================================>