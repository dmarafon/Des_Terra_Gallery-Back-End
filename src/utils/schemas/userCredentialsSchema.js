const { Joi } = require("express-validation");

const credentialsLoginSchema = {
  body: Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .min(4)
      .max(254)
      .messages({ message: "An email is Required" })
      .required(),
    password: Joi.string()
      .max(15)
      .messages({ message: "A Password is Required" })
      .required(),
  }),
};

module.exports = { credentialsLoginSchema };
