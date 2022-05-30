require("dotenv").config();
const express = require("express");

const usersRouter = express.Router();

usersRouter.post("/login");

module.exports = usersRouter;
