const { registerUser } = require("../userControllers");

const User = require("../../../database/models/User");
const mockUsers = require("../../../mocks/mockUsers");

jest.mock("fs", () => ({
  ...jest.requireActual("fs"),
  rename: jest.fn().mockReturnValue("1234image.jpg"),
}));

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

  describe("When invoked with new users credentials in its body", () => {
    test("Then it should call the response's status method with 201", async () => {
      const expectedStatus = 201;

      User.findOne = jest.fn().mockResolvedValue(false);
      User.create = jest.fn().mockResolvedValue(mockUsers[0]);

      await registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });
});
