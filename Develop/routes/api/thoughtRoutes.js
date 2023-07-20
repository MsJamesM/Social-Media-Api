const router = require("express").Router();
const {
  getThoughts,
  getThoughtByID,
  createThought,
  updateThought,
  deleteThought,
} = require("../../controllers/thoughtController.js");

router.route("/").get(getThoughts).post(createThought);

router
  .route("/:thoughtId")
  .get(getThoughtByID)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;
