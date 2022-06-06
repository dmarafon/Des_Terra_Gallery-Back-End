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

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();

  await connectDB(mongoServer.getUri());
});

beforeEach(async () => {
  await Artwork.create(mockArtworks[0]);
  await Artwork.create(mockArtworks[1]);
  await User.create(mockUsers[0]);

  const artwork = await Artwork.find({ title: "sleep" });

  await User.updateOne(
    { firstname: "marcos" },
    // eslint-disable-next-line no-underscore-dangle
    { $push: { artworkauthor: artwork[0]._id } }
  );

  await User.updateOne(
    { firstname: "marcos" },
    // eslint-disable-next-line no-underscore-dangle
    { $push: { artworkauthor: artwork[0]._id } }
  );
});

afterAll(async () => {
  await mongoServer.stop();
  await mongoose.connection.close();
});

describe("Given a GET/myart endpoint", () => {
  describe("When it receives a request with a valid token", () => {
    test("Then it should respond with a status 200 and a the user collection", async () => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJqZXN1cyIsImVtYWlsIjoiamVzdXNwZXJlYUBnbWFpbC5jb20iLCJpZCI6IjYyOTUwMjBhZDE1MDQ0NDZkMGMwNGNlOCIsImlhdCI6MTY1NDQ4MTgwOX0.lztbEeyEWS0bTem9gu1RnfQ8yrWpYQa8hXItV-Rx7cQ";
            // eslint-disable-next-line no-underscore-dangle

        const {[_id: _id]} = await User.find({ firstname: "marcos" });
      // eslint-disable-next-line no-underscore-dangle
      const userId = await _id.valueOf().toString();
      const {
        body: { artworkauthor },
      } = await request(app)
        .get("/artworks/myart")
        .set("Authorization", `Bearer ${token}`)
        .send({ userId });

      // eslint-disable-next-line no-underscore-dangle

      await expect(artworkauthor[0].title).toEqual(mockArtworks[0].title);
    });
  });
});
