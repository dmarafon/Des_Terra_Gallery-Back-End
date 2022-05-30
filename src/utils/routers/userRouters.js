require("dotenv").config();
const express = require("express");
const { validate } = require("express-validation");
const { loginUser } = require("../../server/controllers/userControllers");
const { credentialsLoginSchema } = require("../schemas/userCredentialsSchema");

const usersRouter = express.Router();

usersRouter.post("/login", validate(credentialsLoginSchema), loginUser);

module.exports = usersRouter;
