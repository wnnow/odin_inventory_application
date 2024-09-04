const pokemons = [];

async function fetchURLinfo(url) {
  try {
    const response = await fetch(url);
    if (!response) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json.results;
  } catch (err) {
    console.error(err.message);
  }
}

async function extractPokemonURL(url) {
  try {
    const pokemonsURLs = await fetchURLinfo(url);

    if (!pokemonsURLs) {
      console.error("Failed to fetch Pokémon URLs");
      return;
    }

    const promises = pokemonsURLs.map(async (item, index) => {
      pokemons[index] = { name: item.name };
      try {
        const res = await fetch(item.url);
        return res.json();
      } catch (error) {
        console.error(`Failed to fetch data for ${item.name}:`, error);
        return null;
      }
    });

    const result = await Promise.all(promises);

    return result;
  } catch (error) {
    console.error("An error occurred during the fetch process:", error);
  }
}

function getPokemonTypeAndSprite(data) {
  data.forEach((pokemon, index) => {
    if (pokemon) {
      pokemons[index].imgURL = pokemon.sprites.front_default;
      pokemons[index].type = [];
      pokemon.types.forEach((item) => {
        pokemons[index].type.push(item.type.name);
      });
    }
  });
  return data;
}

function getPokemonFlavorTexts(data) {
  data.forEach((pokemon, index) => {
    if (pokemon) {
      pokemons[index].flavor_text = pokemon.flavor_text_entries[0].flavor_text;
    }
  });
}

const pokemonAPIurl = "https://pokeapi.co/api/v2/pokemon/?limit=151";
const speciesURL = "https://pokeapi.co/api/v2/pokemon-species/?limit=151";

async function fetchAndProcessPokemonData() {
  const extractPokemonData = await extractPokemonURL(
    "https://pokeapi.co/api/v2/pokemon/?limit=15"
  );
  const extractPokemonSpecies = await extractPokemonURL(
    "https://pokeapi.co/api/v2/pokemon-species/?limit=15"
  );
  getPokemonTypeAndSprite(extractPokemonData);
  getPokemonFlavorTexts(extractPokemonSpecies);
}

async function main() {
  await fetchAndProcessPokemonData();

  console.log(pokemons);
}

main();
