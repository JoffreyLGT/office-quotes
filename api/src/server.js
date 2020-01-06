import express from "express";
import userRouter from "./routers/users";
import quotesRouter from "./routers/quotes";
import bodyParser from "body-parser";

const port = process.env["app_port"];
require("./database/db");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// Routes
app.use(quotesRouter);
app.use(userRouter);

// Starts the server
app.listen(port, () =>
  console.log(`Server is running on port ${process.env["app_port"]}`)
);
