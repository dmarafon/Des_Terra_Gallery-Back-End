const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const connectDB = require("../../database");
const app = require("../../server");
const User = require("../../database/models/User");
const mockArtworks = require("../mocks/mockArtworks");
const Artwork = require("../../database/models/Artwork");
const mockUsers = require("../../mocks/mockUsers");

let mongoServer;

jest.mock("firebase/storage", () => ({
  ref: jest.fn().mockReturnValue("avatarRef"),
  uploadBytes: jest.fn().mockResolvedValue(),
  getStorage: jest.fn(),
  getDownloadURL: jest.fn().mockResolvedValue("url"),
}));

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();

  await connectDB(mongoServer.getUri());
});

beforeEach(async () => {
  await Artwork.create(mockArtworks[0]);
  await Artwork.create(mockArtworks[1]);
});

beforeEach(async () => {
  await User.create(mockUsers[0]);
});

afterEach(async () => {
  await User.deleteMany({});
  await Artwork.deleteMany({});
});

afterAll(async () => {
  await mongoServer.stop();
  await mongoose.connection.close();
});

describe("Given a GET/myart endpoint", () => {
  describe("When it receives a request with a valid token but without the userId in the body", () => {
    test("Then it should respond with a status 200 and a the user collection", async () => {
      const expectedErrorMessage = "Bad request";

      const {
        body: { message },
      } = await request(app)
        .get("/artworks/myart")
        .set(
          "Authorization",
          `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJqZXN1cyIsImVtYWlsIjoiamVzdXNwZXJlYUBnbWFpbC5jb20iLCJpZCI6IjYyOTUwMjBhZDE1MDQ0NDZkMGMwNGNlOCIsImlhdCI6MTY1NDQ4MTgwOX0.lztbEeyEWS0bTem9gu1RnfQ8yrWpYQa8hXItV-Rx7cQ`
        );

      expect(message).toBe(expectedErrorMessage);
    });
  });
});

describe("Given a GET/myart endpoint", () => {
  describe("When it receives a request with a valid token but without the userId in the body", () => {
    test("Then it should respond with a status 200 and a the user collection", async () => {
      const expectedErrorMessage = "Bad request";

      const {
        body: { message },
      } = await request(app)
        .get("/artworks/myart/12345")
        .set(
          "Authorization",
          `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJqZXN1cyIsImVtYWlsIjoiamVzdXNwZXJlYUBnbWFpbC5jb20iLCJpZCI6IjYyOTUwMjBhZDE1MDQ0NDZkMGMwNGNlOCIsImlhdCI6MTY1NDQ4MTgwOX0.lztbEeyEWS0bTem9gu1RnfQ8yrWpYQa8hXItV-Rx7cQ`
        );

      expect(message).toBe(expectedErrorMessage);
    });
  });
});
