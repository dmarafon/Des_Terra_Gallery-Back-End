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

const credentialsRegisterSchema = {
  body: Joi.object({
    firstname: Joi.string()
      .max(20)
      .messages({ message: "A First Name is Required" })
      .required(),
    surname: Joi.string()
      .max(20)
      .messages({ message: "A Surname is Required" })
      .required(),
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
    webpage: Joi.string()
      .max(20)
      .messages({ message: "The maximun length is 20 for a webpage" }),
    address: Joi.string()
      .max(40)
      .messages({ message: "The maximun length is 40 for your address" })
      .required(),
    apartmentdoorstair: Joi.string()
      .max(10)
      .messages({ message: "The maximun length is 10 for your address" })
      .required(),
    city: Joi.string()
      .max(40)
      .messages({ message: "The maximun length is 40 for your address" })
      .required(),
    phonenumber: Joi.string()
      .max(20)
      .messages({ message: "The maximun length is 10 for your address" })
      .required(),
    artist: Joi.string()
      .max(10)
      .messages({ message: "The maximun length is 5 for this value" })
      .required(),
    pictureprofile: Joi.string().allow(null, ""),
  }),
};

module.exports = { credentialsLoginSchema, credentialsRegisterSchema };
