const router = require("express").Router();
const {
  getUsers,
  getUserByID,
  createUser,
  updateUser,
  deleteUser,
  createFriend,
  deleteFriend,
} = require("../../controllers/userController.js");

router.route("/").get(getUsers).post(createUser);

router.route("/:userId").get(getUserByID).put(updateUser).delete(deleteUser);

router.route("/:userId/friends").post(createFriend).delete(deleteFriend);

module.exports = router;
