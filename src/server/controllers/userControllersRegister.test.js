const bcrypt = require("bcrypt");
const path = require("path");
const { registerUser } = require("./userControllers");

const User = require("../../database/models/User");
const mockUsers = require("../../mocks/mockUsers");

jest.mock("fs", () => ({
  ...jest.requireActual("fs"),
  rename: jest.fn().mockReturnValue("1234image.jpg"),
}));

const next = jest.fn();

describe("Given a registerUser function", () => {
  const req = {
    body: mockUsers[0],
    file: {
      filename: "test123",
      originalname: "userImage.jpg",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  jest.spyOn(path, "join").mockResolvedValue("image");

  describe("When invoked with new users credentials in its body", () => {
    test("Then it should call the response's status method with 201", async () => {
      const expectedStatus = 201;

      User.findOne = jest.fn().mockResolvedValue(false);
      bcrypt.hash = jest.fn().mockResolvedValue("hashedPassword");
      User.create = jest.fn().mockResolvedValue(mockUsers[0]);

      await registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });

  describe("When it is called with a user that is already present in the database", () => {
    test("Then it should call the 'next' received function with an error message stating 'User already present in the database'", async () => {
      const expectedErrorMessage = "Conflict";

      User.findOne = jest.fn().mockResolvedValue(true);

      await registerUser(req, res, next);
      const expectedError = new Error(expectedErrorMessage);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it is called and the User.create method fails", () => {
    test("Then it should call the 'next' received function", async () => {
      User.findOne = jest.fn().mockResolvedValue(false);
      User.create = jest.fn().mockRejectedValue();

      await registerUser(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
