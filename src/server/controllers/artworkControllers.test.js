const Artwork = require("../../database/models/Artwork");
const { getPaginatedArtworks } = require("./artworkControllers");

jest.mock("../../database/models/Artwork", () => ({
  find: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  skip: jest.fn(),
  countDocuments: jest.fn(),
}));

const next = jest.fn();

describe("Given the getPaginatedArtworks controller", () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  describe("When invoked with a bad request", () => {
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
    test("Then a response with status 400, and a response with the itens requested", async () => {
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
