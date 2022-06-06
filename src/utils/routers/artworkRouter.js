require("dotenv").config();
const express = require("express");
const {
  getPaginatedArtworks,
  getPaginatedMyArtworks,
  deleteArtwork,
} = require("../../server/controllers/artworkControllers");
const auth = require("../../server/middlewares/auth");

const artworksRouter = express.Router();

artworksRouter.get("/all", getPaginatedArtworks);

artworksRouter.get("/myart/:userId", auth, getPaginatedMyArtworks);

artworksRouter.delete("/:artworkId", auth, deleteArtwork);

module.exports = artworksRouter;
