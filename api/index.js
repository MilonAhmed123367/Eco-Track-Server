// const express = require("express");
// const serverless = require("serverless-http");
// const mongoose = require("mongoose");

// const app = express();
// app.use(express.json());

// // Connect MongoDB
// if (!mongoose.connection.readyState) {
//   mongoose.connect(process.env.MONGODB_URI)
//     .then(() => console.log("MongoDB connected"))
//     .catch(err => console.error(err));
// }

// // Import routes
// const challengesRouter = require("../routes/Challenge");
// const tipsRouter = require("../routes/Tip");
// const eventsRouter = require("../routes/Event");
// const userChallengesRouter = require("../routes/userChallenges");

// // use routes
// app.use("/api/challenges", challengesRouter);
// app.use("/api/tips", tipsRouter);
// app.use("/api/events", eventsRouter);
// app.use("/api/userChallenges", userChallengesRouter);

// module.exports = app;
// module.exports.handler = serverless(app);
