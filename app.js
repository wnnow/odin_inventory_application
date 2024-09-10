const express = require("express");
require("dotenv").config();
const path = require("node:path");
const pokemonRouter = require("./router/pokemon");
const trainerRouter = require("./router/trainers");
const typeRouter = require("./router/types");
const pokemonsController = require("./controllers/pokemonsControllers");

const app = express();
const assetPath = path.join(__dirname, "public");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(assetPath));
app.use(express.urlencoded({ extended: true }));
app.use("/pokemons", pokemonRouter);
app.use("/trainers", trainerRouter);
app.use("/types", typeRouter);

app.get("/", pokemonsController.getPokemons);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening at PORT ${PORT}`);
});
