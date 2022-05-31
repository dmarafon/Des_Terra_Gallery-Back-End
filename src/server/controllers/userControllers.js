const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const User = require("../../database/models/User");

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
      firstName: user.first_name,
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

module.exports = { loginUser };
