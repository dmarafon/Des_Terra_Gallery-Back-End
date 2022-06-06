require("dotenv").config();
const express = require("express");
const {
  getPaginatedArtworks,
  getPaginatedMyArtworks,
} = require("../../server/controllers/artworkControllers");
const auth = require("../../server/middlewares/auth");

const artworksRouter = express.Router();

artworksRouter.get("/all", getPaginatedArtworks);

artworksRouter.get("/myart", auth, getPaginatedMyArtworks);

module.exports = artworksRouter;
