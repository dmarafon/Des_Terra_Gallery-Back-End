const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const User = require("../../database/models/User");

const loginUser = async (req, res, next) => {
  const username = req.body.username.toString();
  const password = req.body.password.toString();

  const user = await User.findOne({ username });

  if (!user) {
    const error = new Error("Incorrect password");
    error.statusCode = 403;
    error.customMessage = "Username or password is wrong";

    next(error);
  } else {
    const userData = {
      name: user.name,
      username: user.username,
      id: user.id,
    };
    const rightPassword = await bcrypt.compare(password, user.password);

    if (!rightPassword) {
      const error = new Error("Incorrect password");
      error.statusCode = 403;
      error.customMessage = "Username or password is wrong";

      next(error);
    } else {
      const token = jsonwebtoken.sign(userData, process.env.SECRET);

      res.status(200).json({ token });
    }
  }
};

module.exports = { loginUser };
