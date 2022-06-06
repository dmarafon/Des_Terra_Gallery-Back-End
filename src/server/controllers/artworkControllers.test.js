const Artwork = require("../../database/models/Artwork");
const User = require("../../database/models/User");
const mockArtworks = require("../../utils/mocks/mockArtworks");
const { getPaginatedArtworks, deleteArtwork } = require("./artworkControllers");

jest.mock("../../database/models/Artwork", () => ({
  find: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  populate: jest.fn().mockReturnThis(),
  skip: jest.fn(),
  countDocuments: jest.fn(),
}));

const next = jest.fn();

describe("Given the getPaginatedArtworks controller", () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  describe("When invoked", () => {
    Artwork.skip.mockImplementation(() => [
      {
        id: "6294aa4bc78dbede9429006e",

        title: "sleep",
        medium: "mixed media in paper",
        height: "100 inches",
        width: "40 inches",
        style: "mixed media",
        picture: "https://ibb.co/QC6YrNc",
        description:
          "This work was created during a residence in Chile where I had the pleasure to meet Kamiko. I was very inspired by her art and even more by her perfect stillness while posing to this painting. One thing that I will take from Kamiko is that silence goes to places that sound would never dare to go.",
        author: ["6294a387c78dbede94290061"],
        purchaseprice: "400",
        monthlyrateprice: "30",
      },
    ]);
    test("Then a response with status 200, and a response with the itens requested", async () => {
      const expectedStatus = 200;

      const expectedResponse = {
        artworks: [
          {
            author: ["6294a387c78dbede94290061"],
            description:
              "This work was created during a residence in Chile where I had the pleasure to meet Kamiko. I was very inspired by her art and even more by her perfect stillness while posing to this painting. One thing that I will take from Kamiko is that silence goes to places that sound would never dare to go.",
            height: "100 inches",
            id: "6294aa4bc78dbede9429006e",
            medium: "mixed media in paper",
            monthlyrateprice: "30",
            picture: "https://ibb.co/QC6YrNc",
            purchaseprice: "400",
            style: "mixed media",
            title: "sleep",
            width: "40 inches",
          },
        ],
        currentPage: 1,
        totalPage: NaN,
      };
      const req = { query: { page: 1, limit: 1, next } };

      await getPaginatedArtworks(req, res, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });
});

describe("Given a deleteArtwork controller", () => {
  const expectedStatus = 200;

  const req = {
    body: { userId: 3 },
    params: {
      artworkId: 3,
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe("When invoked with a given artwork id corresponding to an existing art in the database in the body of the request", () => {
    Artwork.findByIdAndDelete = jest.fn().mockResolvedValue(mockArtworks[0]);
    User.findByIdAndUpdate = jest.fn().mockResolvedValue(true);

    test("Then it should call the response's status method with 200", async () => {
      await deleteArtwork(req, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response's json method with the deleted record", async () => {
      const expectedJsonResponse = {
        deleted_artwork: mockArtworks[0],
      };

      await deleteArtwork(req, res);

      expect(res.json).toHaveBeenCalledWith(expectedJsonResponse);
    });
  });

  describe("When invoked with and an error occurs", () => {
    test("Then it should call the next received function with ", async () => {
      const expectedErrorMessage = "Artwork id not found";

      const expectedError = new Error(expectedErrorMessage);

      Artwork.findByIdAndDelete = jest.fn().mockResolvedValue(false);

      await deleteArtwork(req, res, next);

      expect(next).not.toHaveBeenCalledWith(expectedError);
    });
  });
});
