const mockingoose = require("mockingoose");
const Artwork = require("../../../database/models/Artwork");
const { getPaginatedArtworks } = require("../artworkControllers");

const next = jest.fn();

describe("Given the getPaginatedArtworks controller", () => {
  const mockArtwork = {
    title: "multiply",
    medium: "oil on paper",
    height: "45",
    width: "32",
    style: "figurative",
    image: "uploads\\artimages\\1654782828093Daniel Segrove (3).jpeg",
    imagebackup:
      "https://firebasestorage.googleapis.com/v0/b/desterra-181ac.appspot.com/o/1654782828093Daniel%20Segrove%20(3).jpeg?alt=media&token=4f207efd-ea7f-4a8b-b5f2-84593233cc8e",
    description:
      "This was a comission that I did for a friend back in 2010. Since the subject of this work always had multiple facets, I tried to develop this on this simple concept of multiplication, one for each of her moods.",
    purchaseprice: "450",
    monthlyrateprice: "34",
    author: [
      {
        surname: "segrove",
        firstname: "daniel",
        id: "629d1dce77d93a10ce003a2b",
      },
    ],
    id: "62a1fb6ccd04fa0b3f8073a0",
  };

  describe("When invoked passing in the query parameters of the request a filter style and an order purchase number and finds the artworks", () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    test("Then response status will be 200", async () => {
      const expectedStatus = 200;

      const req = {
        query: {
          page: 1,
          limit: 12,
          filterStyle: "geometric",
          sortOrderPurchase: "1",
        },
      };

      mockingoose(Artwork).toReturn(mockArtwork, "find");

      Artwork.countDocuments = jest.fn().mockReturnValue(2);

      await getPaginatedArtworks(req, res, next);

      expect(res.status).toHaveBeenLastCalledWith(expectedStatus);
    });
  });

  describe("When invoked passing in the query parameters of the request a filter style and an order rent number and finds the artworks", () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    test("Then response status will be 200", async () => {
      const expectedStatus = 200;

      const req = {
        query: {
          page: 1,
          limit: 12,
          filterStyle: "geometric",
          sortOrderRent: "1",
        },
      };

      mockingoose(Artwork).toReturn(mockArtwork, "find");

      Artwork.countDocuments = jest.fn().mockReturnValue(2);

      await getPaginatedArtworks(req, res, next);

      expect(res.status).toHaveBeenLastCalledWith(expectedStatus);
    });
  });

  describe("When invoked passing in the query parameters of the request only an order rent number and finds the artworks", () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    test("Then response status will be 200", async () => {
      const expectedStatus = 200;

      const req = {
        query: {
          page: 1,
          limit: 12,
          sortOrderRent: "1",
        },
      };

      mockingoose(Artwork).toReturn(mockArtwork, "find");

      Artwork.countDocuments = jest.fn().mockReturnValue(2);

      await getPaginatedArtworks(req, res, next);

      expect(res.status).toHaveBeenLastCalledWith(expectedStatus);
    });
  });

  describe("When invoked passing in the query parameters of the request only an order rent number and finds the artworks", () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    test("Then response status will be 200", async () => {
      const expectedStatus = 200;

      const req = {
        query: {
          page: 1,
          limit: 12,
          sortOrderPurchase: "1",
        },
      };

      mockingoose(Artwork).toReturn(mockArtwork, "find");

      Artwork.countDocuments = jest.fn().mockReturnValue(2);

      await getPaginatedArtworks(req, res, next);

      expect(res.status).toHaveBeenLastCalledWith(expectedStatus);
    });
  });
});
