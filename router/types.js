const router = require("express").Router();
const typeController = require("../controllers/typeController");

router.get("/", typeController.getPokemonTypes);

router.get("/:id", (req, res) => {
  res.render("type", { title: "Type" });
});

router.post("/", (req, res) => {
  res.redirect("types");
});

module.exports = router;
