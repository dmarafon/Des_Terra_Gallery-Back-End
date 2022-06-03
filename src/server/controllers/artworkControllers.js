const Artwork = require("../../database/models/Artwork");
const customError = require("../../utils/customError");

const getPaginatedArtworks = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  // debugger;
  try {
    const artworks = await Artwork.find()
      .limit(limit * 1)
      .skip((page - 1) * 1);

    const count = await Artwork.countDocuments();

    res.status(200).json({
      artworks,
      totalPage: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch {
    const error = customError(
      400,
      "Bad request",
      "Wrong parameters to get Data"
    );
    next(error);
  }
};

module.exports = { getPaginatedArtworks };
