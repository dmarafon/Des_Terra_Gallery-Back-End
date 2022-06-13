const Artwork = require("../../../database/models/Artwork");
const User = require("../../../database/models/User");
const mockArtworks = require("../../../utils/mocks/mockArtworks");
const { deleteArtwork, createArtwork } = require("../artworkControllers");

const next = jest.fn();

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

describe("Given the creatArtwork controller", () => {
  jest.mock("../../../database/models/Artwork", () => ({
    find: jest.fn().mockReturnThis(),
  }));

  jest.mock("fs", () => ({
    ...jest.requireActual("fs"),
    rename: jest.fn().mockReturnValue("1234image.jpg"),
  }));
  describe("When invoked", () => {
    test("Then a response with status 201, and a response with the itens requested should be received", async () => {
      const expectedStatus = 201;

      const expectedResponse = {
        new_artwork: true,
      };

      const req = {
        image: "test",
        firebaseUrl: "test",
        file: {
          destination: "uploads/artimages",
          encoding: "7bit",
          fieldname: "artimages",
          filename: "9d70f017dbcc4a56592467ccca5091fb",
          mimetype: "image/jpeg",
          originalname: "crop1.jpg",
          path: "uploads/artimages/9d70f017dbcc4a56592467ccca5091fb",
          size: 851349,
        },
        body: {
          filename: "test123",
          originalname: "userImage.jpg",
        },
        userId: "6295020ad1504446d0c04ce8",
        artwork: {
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
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Artwork.create = jest.fn().mockResolvedValue(true);

      User.updateOne = jest.fn().mockResolvedValue(true);

      User.findByIdAndUpdate = jest.fn().mockResolvedValue(true);

      await createArtwork(req, res, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });

  describe("When invoked and user is not found", () => {
    test("Then the function will fail, the error will be collected and the next function called", async () => {
      const req = {
        image: "test",
        firebaseUrl: "test",
        file: {
          destination: "uploads/artimages",
          encoding: "7bit",
          fieldname: "artimages",
          filename: "9d70f017dbcc4a56592467ccca5091fb",
          mimetype: "image/jpeg",
          originalname: "crop1.jpg",
          path: "uploads/artimages/9d70f017dbcc4a56592467ccca5091fb",
          size: 851349,
        },
        body: {
          filename: "test123",
          originalname: "userImage.jpg",
        },
        userId: "6295020ad1504446d0c04ce8",
        artwork: {
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
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Artwork.create = jest.fn().mockResolvedValue(true);

      User.updateOne = jest.fn().mockResolvedValue(false);

      User.findByIdAndUpdate = jest.fn().mockResolvedValue(true);

      await createArtwork(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
