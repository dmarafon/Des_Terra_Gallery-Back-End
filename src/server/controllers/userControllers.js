require("dotenv").config();
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const User = require("../../database/models/User");
const customError = require("../../utils/customError");

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("Incorrect email");
    error.statusCode = 403;
    error.customMessage = "Email or password is wrong";
    next(error);
  } else {
    const userData = {
      firstName: user.firstname,
      email: user.email,
      id: user.id,
    };
    const rightPassword = await bcrypt.compare(password, user.password);

    if (!rightPassword) {
      const error = new Error("Incorrect password");
      error.statusCode = 403;
      error.customMessage = "Email or password is wrong";

      next(error);
    } else {
      const token = jsonwebtoken.sign(userData, process.env.SECRET);

      res.status(200).json({ token });
    }
  }
};

const registerUser = async (req, res, next) => {
  try {
    const {
      firstname,
      surname,
      email,
      password,
      webpage,
      address,
      apartmentdoorstair,
      city,
      phonenumber,
      artist,
    } = req.body;
    const { image, firebaseUrl } = req;
    const user = await User.findOne({ email });
    if (user) {
      const error = customError(
        409,

        "User already present in the database",
        "Conflict"
      );
      next(error);
      return;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      firstname,
      surname,
      email,
      password: encryptedPassword,
      webpage,
      address,
      apartmentdoorstair,
      city,
      phonenumber,
      artist,
      about: "",
      pictureprofile: image,
      imagebackup: firebaseUrl,
      artworkauthor: [],
      artworkbought: [],
      artworkrented: [],
    };
    await User.create(newUser);
    res.status(201).json({ new_user: { email: newUser.email } });
  } catch {
    const error = customError(400, "Wrong user data", "Bad Request");
    next(error);
  }
};

module.exports = { loginUser, registerUser };
