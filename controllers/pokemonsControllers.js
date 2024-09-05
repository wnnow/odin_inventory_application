const db = require("../db/pokemonQueries");

async function getPokemons(req, res) {
  try {
    const pokemons = await db.queriesPokemons();
    res.render("index", {
      title: "Pokédex",
      pokemons: pokemons,
      capitalizeFirstChar: capitalizeFirstChar,
    });
  } catch (error) {
    console.error("Error fetching pokemons:", error);
    console.error(error);
    res.status(500);
  }
}
function capitalizeFirstChar(str) {
  return str[0].toUpperCase() + str.substr(1, str.length);
}

module.exports = {
  getPokemons,
  capitalizeFirstChar,
};
