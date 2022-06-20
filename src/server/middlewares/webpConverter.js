const sharp = require("sharp");

const customError = require("../../utils/customError");

const webpConverter = async (req, res, next) => {
  if (req.file) {
    try {
      const data = await sharp(req.file.path)
        .webp({ lossy: true, quality: 50 })
        .toBuffer();

      req.webpImage = data;

      next();
    } catch {
      const error = customError(401, "Bad request", "Invalid Image");
      next(error);
    }
  } else {
    next();
  }
};

module.exports = webpConverter;
