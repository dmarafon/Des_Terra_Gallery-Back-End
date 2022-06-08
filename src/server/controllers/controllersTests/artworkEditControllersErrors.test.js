const Artwork = require("../../../database/models/Artwork");
const { editArtwork } = require("../artworkControllers");

describe("Given the editArtwork controller", () => {
  jest.mock("../../../database/models/Artwork", () => ({
    find: jest.fn().mockReturnThis(),
  }));

  const next = jest.fn();

  describe("When invoked without an artwork, params and file", () => {
    test("Then it should throw an error and the next function should be called", async () => {
      const req = {};

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Artwork.findByIdAndUpdate = jest.fn().mockResolvedValue(false);

      await editArtwork(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
