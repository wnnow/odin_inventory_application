const router = require("express").Router();
const typeController = require("../controllers/typeController");

router.get("/", typeController.getPokemonTypes);

router.get("/:type", typeController.getPokemonInType);

router.post("/", (req, res) => {
  res.redirect("types");
});

module.exports = router;
