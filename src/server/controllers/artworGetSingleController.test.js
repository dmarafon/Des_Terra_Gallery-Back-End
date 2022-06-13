const mockingoose = require("mockingoose");
const { getSingleArtwork } = require("./artworkControllers");
const model = require("../../database/models/Artwork");
const Artwork = require("../../database/models/Artwork");

const next = jest.fn();

describe("Given the getPaginatedMyArtworks controller", () => {
  describe("When invoked passing in the query parameters of the request a filter style and an order purchase number and finds the artworks", () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    // eslint-disable-next-line no-underscore-dangle
    const _doc = {
      _id: "507f191e810c19729de860ea",
      artworkAuthor: "name",
    };

    test("Then response status will be 200", async () => {
      const expectedStatus = 200;

      const req = {
        params: { artworkId: "507f191e810c19729de860ea" },
      };

      mockingoose(model).toReturn(_doc, "findOne");

      Artwork.countDocuments = jest.fn().mockReturnValue(2);

      await getSingleArtwork(req, res, next);

      expect(res.status).toHaveBeenLastCalledWith(expectedStatus);
    });
  });
});
