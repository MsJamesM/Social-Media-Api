const router = require("express").Router();
const {
  getUsers,
  getUserByID,
  createUser,
  updateUser,
  deleteUser,
} = require("../../controllers/userController.js");

router.route("/").get(getUsers).post(createUser);

router.route("/:userId").get(getUserByID).put(updateUser).delete(deleteUser);

module.exports = router;
