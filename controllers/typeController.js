const db = require("../db/typeQueries");
const capitalizeFirstChar =
  require("./pokemonsControllers").capitalizeFirstChar;

async function getPokemonTypes(req, res) {
  try {
    const types = await db.queriesTypes();
    res.render("types", {
      title: "Pokémon Types",
      types: types,
      capitalizeFirstChar: capitalizeFirstChar,
    });
  } catch (error) {}
}

module.exports = {
  getPokemonTypes,
};
