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

async function getPokemonInType(req, res) {
  const { type } = req.params;

  try {
    const pokemons = await db.queryPokemonType(type);
    if (pokemons.length === 0) {
      res.render("type", {
        title: `Oops! The type you are looking for doesn't exist right now.`,
        pokemons: pokemons,
        capitalizeFirstChar: capitalizeFirstChar,
      });
    } else {
      res.render("type", {
        title: `${capitalizeFirstChar(type)} Type Pokémon `,
        pokemons: pokemons,
        capitalizeFirstChar: capitalizeFirstChar,
      });
    }
  } catch (error) {
    console.error("Error occur while render process: ", error);
  }
}

module.exports = {
  getPokemonTypes,
  getPokemonInType,
};
