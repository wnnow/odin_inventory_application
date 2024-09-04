const express = require("express");
require("dotenv").config();
const path = require("node:path");

const app = express();
const assetPath = path.join(__dirname, "public");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(assetPath));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { title: "Pokédex" });
});
