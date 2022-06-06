const Artwork = require("../../database/models/Artwork");
const User = require("../../database/models/User");
const customError = require("../../utils/customError");

const getPaginatedArtworks = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const artworks = await Artwork.find()
      .populate({
        path: "author",
        select: "firstname surname",
        model: User,
      })
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

const getPaginatedMyArtworks = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  const { userId } = req.body;

  try {
    const { artworkauthor } = await User.findById(userId)
      .populate({
        path: "artworkauthor",
        model: Artwork,
      })
      .limit(limit * 1)
      .skip((page - 1) * 1);

    const count = await User.countDocuments();

    res.status(200).json({
      artworkauthor,
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

module.exports = { getPaginatedArtworks, getPaginatedMyArtworks };
