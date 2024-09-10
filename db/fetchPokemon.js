const pool = require("./pool");
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
      pokemons[index].id = pokemon.id;
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
    "https://pokeapi.co/api/v2/pokemon/?limit=151"
  );

  getPokemonTypeAndSprite(extractPokemonData);
}

async function main() {
  await fetchAndProcessPokemonData();
  await insertPokemon();
}

async function insertPokemon() {
  try {
    await pool.query(`INSERT INTO type (name)
      VALUES
        ('normal'),
        ('fire'),
        ('water'),
        ('electric'),
        ('grass'),
        ('ice'),
        ('fighting'),
        ('poison'),
        ('ground'),
        ('flying'),
        ('psychic'),
        ('bug'),
        ('rock'),
        ('ghost'),
        ('dragon'),
        ('dark'),
        ('steel'),
        ('fairy')
      ON CONFLICT (name) DO NOTHING;`);
  } catch (error) {
    console.error("Error during insert type process: ", error);
  }

  for (const pokemon of pokemons) {
    try {
      const res = await pool.query(
        "INSERT INTO pokemon_info (id, name, img_url, created_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING serial_id;",
        [pokemon.id, pokemon.name, pokemon.imgURL]
      );

      const pokemonId = res.rows[0].serial_id;
      console.log("pokemon_serial_id: ", pokemonId);

      const typeResult = await pool.query(
        "SELECT serial_id FROM type WHERE name = ANY($1::text[]);",
        [pokemon.type]
      );
      const typeIds = typeResult.rows.map((row) => row.serial_id);
      console.log("Fetched type IDs:", typeIds);

      for (const typeId of typeIds) {
        await pool.query(
          "INSERT INTO pokemon_type (pokemon_id, type_id) VALUES ($1, $2) ON CONFLICT (pokemon_id, type_id) DO NOTHING;",
          [pokemonId, typeId]
        );
        console.log("Type inserted successfully");
      }

      console.log("Pokemon and types inserted successfully");
    } catch (error) {
      console.error("Error while inserting into pokemons database: ", error);
    }
  }
}
