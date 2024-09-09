const router = require("express").Router();
const typeController = require("../controllers/typeController");

router.get("/", typeController.getPokemonTypes);

router.get("/:type", typeController.getPokemonInType);

module.exports = router;
