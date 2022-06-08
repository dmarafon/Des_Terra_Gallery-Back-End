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
const imageConverter = require("../../server/middlewares/imageConverter");

const usersRouter = express.Router();

const upload = multer({
  dest: path.join("uploads", "artimages"),
  limits: {
    fileSize: 8000000,
  },
});

usersRouter.post("/login", validate(credentialsLoginSchema), loginUser);

usersRouter.post(
  "/register",
  upload.single("artimages"),
  imageConverter,
  registerUser
);

module.exports = usersRouter;
