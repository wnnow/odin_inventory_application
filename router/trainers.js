const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("trainers", { title: "Trainers" });
});

router.get("/:id", (req, res) => {
  res.render("trainer", { title: "Trainer" });
});

router.post("/", (req, res) => {
  res.redirect("trainers");
});

module.exports = router;
