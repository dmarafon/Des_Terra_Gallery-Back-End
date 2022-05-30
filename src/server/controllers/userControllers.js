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
      firstName: user.firstName,
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
      const token = jsonwebtoken.sign(
        userData,
        "33578A29D97B4E01A2863DF1B36C2235D12D03F829482F26F2A9A2BFCF9E1871"
      );

      res.status(200).json({ token });
    }
  }
};

module.exports = { loginUser };
