const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
const errorMiddleware = require("./middleware/error");
const dotenv = require("dotenv");

app.use(express.json());

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));

// Config
dotenv.config({path:"backend/config/config.env"});

//Route Imports
const user = require("./routes/userRoute")

app.use("/api/v1", user);

app.use(errorMiddleware);

module.exports = app;

