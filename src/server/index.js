const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { notFoundError, generalError } = require("./middlewares/errors");
const usersRouter = require("../utils/routers/userRouters");
const artworksRouter = require("../utils/routers/artworkRouter");

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:4000",
    "http://localhost:4001",
    "http://localhost:4002",
    "https://desterragallery.netlify.app/",
    "https://desterragallery.netlify.app",
  ],
};

const app = express();
app.disable("x-powered-by");
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.static("uploads"));
app.use(express.json());

app.use("/users", usersRouter);
app.use("/artworks", artworksRouter);

app.use(notFoundError);
app.use(generalError);

module.exports = app;
