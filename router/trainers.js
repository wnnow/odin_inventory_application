const router = require("express").Router();
const trainersController = require("../controllers/trainersControllers");

router.get("/", trainersController.getTrainersInfo);

router.get("/:id", trainersController.getTrainerInfo);

router.post("/", (req, res) => {
  res.redirect("trainers");
});

module.exports = router;
