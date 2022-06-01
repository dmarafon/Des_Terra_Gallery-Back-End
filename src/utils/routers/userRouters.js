require("dotenv").config();
const express = require("express");
const { validate } = require("express-validation");
const multer = require("multer");
const path = require("path");
const {
  loginUser,
  registerUser,
} = require("../../server/controllers/userControllers");
const {
  credentialsLoginSchema,
  credentialsRegisterSchema,
} = require("../schemas/userCredentialsSchema");

const usersRouter = express.Router();

const upload = multer({
  dest: path.join("uploads", "images"),
});

usersRouter.post("/login", validate(credentialsLoginSchema), loginUser);

usersRouter.post(
  "/register",
  upload.single("image"),
  validate(credentialsRegisterSchema),
  registerUser
);

module.exports = usersRouter;
