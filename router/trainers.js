const router = require("express").Router();
const trainersController = require("../controllers/trainersControllers");

router.get("/", trainersController.getTrainersInfo);

router.get("/:id", trainersController.getTrainerInfo);

router.post(
  "/add",
  trainersController.validateTrainer,
  trainersController.addTrainer
);

router.post("/:id/update", trainersController.editTrainerInfo);

router.get("/:id/addPokemon", trainersController.renderAddTrainerPokemonPage);
router.post("/:id/addPokemon", trainersController.updateTrainerPokemon);

module.exports = router;
