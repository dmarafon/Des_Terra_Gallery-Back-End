require("dotenv").config();
const express = require("express");
const { loginUser } = require("../../server/controllers/userControllers");

const usersRouter = express.Router();

usersRouter.post("/login", loginUser);

module.exports = usersRouter;
