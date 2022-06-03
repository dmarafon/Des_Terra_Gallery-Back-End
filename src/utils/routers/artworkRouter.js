require("dotenv").config();
const express = require("express");
const {
  getPaginatedArtworks,
} = require("../../server/controllers/artworkControllers");

const artworksRouter = express.Router();

artworksRouter.get("/all", getPaginatedArtworks);

module.exports = artworksRouter;
