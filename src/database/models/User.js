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
  addres: {
    type: String,
    required: true,
  },
  apartmentDoorStair: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  pictureProfile: {
    type: String,
  },
  artist: {
    type: Boolean,
    required: true,
  },
  about: {
    type: String,
  },
  artworkAuthor: [
    {
      type: Schema.Types.ObjectId,
      ref: "Artwork",
    },
  ],
  artworkBought: [
    {
      type: Schema.Types.ObjectId,
      ref: "Artwork",
    },
  ],
  artworkRented: [
    {
      type: Schema.Types.ObjectId,
      ref: "Artwork",
    },
  ],
});

const User = model("User", UserSchema, "users");

module.exports = User;
