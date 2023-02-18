import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import morgan from "morgan";
import mongoose from "mongoose";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
// hello
// db and authenticateUser

// routers

// third-party middleware
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("tiny"));
}

// middlewares
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error.js";
import connectDB from "./db/connectDB.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

// only when ready to deploy
// app.use(express.static(path.resolve(__dirname, './client/build')));

// only when ready to deploy
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
// });

app.get("/", (_, res) => {
  res.send("reached the server api");
});

// Error and Not found handlers
app.use("*", notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    connectDB(process.env.MONGO_URL)
    mongoose.connection.once("open", () =>
      console.log("Connected to Database MongoDB")
    );
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
