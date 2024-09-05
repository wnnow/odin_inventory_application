const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("index", { title: "Pokédex" });
});

router.get("/:id", (req, res) => {
  res.render("pokemon", { title: "Pokemon" });
});

router.post("/", (req, res) => {
  res.redirect("index", { title: "Pokédex" });
});

module.exports = router;
