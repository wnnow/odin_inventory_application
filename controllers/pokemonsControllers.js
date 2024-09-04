async function getPokemons() {
  const url = "https://pokeapi.co/api/v2/pokemon/?limit=151";
  try {
    const response = await fetch(url);
    if (!response) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
  } catch (err) {
    console.error(err.message);
  }
}

getPokemons();
const speciesURL = "https://pokeapi.co/api/v2/pokemon-species/?limit=151";
