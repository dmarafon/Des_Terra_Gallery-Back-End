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
  },
  width: {
    type: String,
    required: true,
  },
  style: {
    type: String,
    required: true,
  },
  image: {
    type: String,
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
