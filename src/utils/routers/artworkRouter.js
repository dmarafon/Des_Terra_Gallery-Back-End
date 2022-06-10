require("dotenv").config();
const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  getPaginatedArtworks,
  getPaginatedMyArtworks,
  getSingleArtwork,
  deleteArtwork,
  createArtwork,
  editArtwork,
} = require("../../server/controllers/artworkControllers");
const auth = require("../../server/middlewares/auth");
const imageConverter = require("../../server/middlewares/imageConverter");

const artworksRouter = express.Router();

const upload = multer({
  dest: path.join("uploads", "artimages"),
  limits: {
    fileSize: 8000000,
  },
});

artworksRouter.get("/all", getPaginatedArtworks);

artworksRouter.get("/myart", auth, getPaginatedMyArtworks);

artworksRouter.delete("/:artworkId", auth, deleteArtwork);

artworksRouter.get("/single/:artworkId", getSingleArtwork);

artworksRouter.post(
  "/addart",
  auth,
  upload.single("artimages"),
  imageConverter,
  createArtwork
);

artworksRouter.put(
  "/editart/:artworkId",
  auth,
  upload.single("artimages"),
  imageConverter,
  editArtwork
);

module.exports = artworksRouter;
