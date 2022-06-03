const { Schema, model } = require("mongoose");

const ArtworkSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  medium: {
    type: String,
    required: true,
  },
  height: {
    type: String,
    required: true,
    unique: true,
  },
  width: {
    type: String,
    required: true,
  },
  style: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  purchaseprice: {
    type: String,
    required: true,
  },
  monthlyrateprice: {
    type: String,
  },
  author: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Artwork = model("Artwork", ArtworkSchema, "artworks");

module.exports = Artwork;