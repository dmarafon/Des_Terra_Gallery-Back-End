require("dotenv").config();
const express = require("express");
const { validate } = require("express-validation");
const multer = require("multer");
const path = require("path");
const {
  loginUser,
  registerUser,
} = require("../../server/controllers/userControllers");
const { credentialsLoginSchema } = require("../schemas/userCredentialsSchema");

const usersRouter = express.Router();

const upload = multer({
  dest: path.join("uploads", "images"),
  limits: {
    fileSize: 8000000,
  },
});

usersRouter.post("/login", validate(credentialsLoginSchema), loginUser);

usersRouter.post("/register", upload.single("image"), registerUser);

module.exports = usersRouter;
