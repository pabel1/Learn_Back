const express = require("express");

const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// internal import
// const errorMiddleware = require("./src/middleware/errorMiddleware");
const remainderRoute = require("./src/modules/push_notification/router.push");

// environment variable setup
dotenv.config();

// for mongoose deprication warning
mongoose.set("strictQuery", true);
// Check if DB_URL is defined

if (!process.env.DB_URL) {
  console.error("Database URL not found. Please provide a valid DB_URL.");
} else {
  // database connection
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Database connected with ${data.connection.host}`);
    });
}

// creating an app
const app = express();
const PORT = process.env.PORT || 4000;

// middlewares
app.use(cors());

app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

// Handeling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Sutting down the server due to Uncaught Exception");
  process.exit(1);
});

// route setup
app.use("/api/v1", remainderRoute);

// default error handler
const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
};

// app.use(errorHandler);
// app.use(errorMiddleware);

// listening port
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Unhandeled Promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Sutting down the server due to Unhandled Promise Rejection");

  // server.close(() => {
  //   process.exit(1);
  // });
});
