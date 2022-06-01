const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  webpage: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  apartmentdoorstair: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: String,
    required: true,
  },
  pictureprofile: {
    type: String,
  },
  artist: {
    type: String,
    required: true,
  },
  about: {
    type: String,
  },
  artworkauthor: [
    {
      type: Schema.Types.ObjectId,
      ref: "Artwork",
    },
  ],
  artworkbought: [
    {
      type: Schema.Types.ObjectId,
      ref: "Artwork",
    },
  ],
  artworkrented: [
    {
      type: Schema.Types.ObjectId,
      ref: "Artwork",
    },
  ],
});

const User = model("User", UserSchema, "users");

module.exports = User;
