const router = require("express").Router();
const trainersController = require("../controllers/trainersControllers");

router.get("/", trainersController.getTrainersInfo);

router.get("/:id", trainersController.getTrainerInfo);

router.post("/add", trainersController.addTrainer);

router.post("/:id/update", trainersController.editTrainerInfo);

module.exports = router;
