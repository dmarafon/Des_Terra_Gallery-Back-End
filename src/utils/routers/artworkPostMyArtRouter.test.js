const request = require("supertest");
const fs = require("fs");
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

jest.spyOn(fs, "rename").mockImplementation((oldpath, newpath, callback) => {
  callback("error");
});

describe("Given a POST /allart/ endpoint", () => {
  describe("When it receives a request with a valid token and a request to create an Artwork", () => {
    test("Then it should respond with a 201 status and the new note created", async () => {
      const artToBeCreated = {
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
      };

      const {
        body: { token },
      } = await request(app)
        .post("/users/login")
        .send({
          email: mockUsers[0].email,
          password: "j1234",
        })
        .expect(200);

      const { body: artwork } = await request(app)
        .post(`/artworks/addart`)
        .set("Authorization", `Bearer ${token}`)
        .send(artToBeCreated)
        .expect(201);

      expect(artwork.new_artwork).toHaveProperty("title", "sleep");
      expect(artwork.new_artwork).toHaveProperty("width", "40 inches");
      expect(artwork.new_artwork).toHaveProperty("height", "100 inches");
    });
  });
});
