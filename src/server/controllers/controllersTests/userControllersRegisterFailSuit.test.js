const { registerUser } = require("../userControllers");

const User = require("../../../database/models/User");
const mockUsers = require("../../../mocks/mockUsers");

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

  describe("When it is called and the User.create method fails", () => {
    test("Then it should call the 'next' received function", async () => {
      User.findOne = jest.fn().mockResolvedValue(false);
      User.create = jest.fn().mockRejectedValue();

      await registerUser(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
