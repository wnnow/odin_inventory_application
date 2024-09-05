const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("types", { title: "Types" });
});

router.get("/:id", (req, res) => {
  res.render("type", { title: "Type" });
});

router.post("/", (req, res) => {
  res.redirect("types");
});

module.exports = router;
