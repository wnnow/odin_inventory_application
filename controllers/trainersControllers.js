const db = require("../db/trainerQueries");
const queriesPokemons = require("../db/pokemonQueries").queriesPokemons;
const capitalizeFirstChar =
  require("./pokemonsControllers").capitalizeFirstChar;

async function getTrainersInfo(req, res) {
  try {
    const trainers = await db.queryTrainers();
    if (trainers.length === 0) {
      res.render("trainers", {
        title: "Trainers not found, you want to create one?",
        trainers: trainers,
      });
    } else {
      res.render("trainers", {
        title: "Trainers",
        trainers: trainers,
        capitalizeFirstChar: capitalizeFirstChar,
      });
    }
  } catch (error) {
    console.error("Error occur while render trainers info: ", error);
  }
}

async function getTrainerInfo(req, res) {
  try {
    const { id } = req.params;
    const trainer = await db.queryTrainer(id);

    if (!trainer || trainer.length === 0) {
      res.render("trainer", {
        title: "Oops! Trainer not found",
        trainer: trainer,
        capitalizeFirstChar: capitalizeFirstChar,
      });
    } else {
      // const trainerMap = {};
      // trainer.forEach((row) => {
      //   if (!trainerMap[row.trainer_id]) {
      //     trainerMap[row.trainer_id] = {
      //       trainer_id: row.trainer_id,
      //       trainer_name: row.trainer_name,
      //       trainer_img_url: row.trainer_img_url,
      //       trainer_gender: row.trainer_gender,
      //       pokemons: [],
      //     };
      //   }

      //   trainerMap[row.trainer_id].pokemons.push({
      //     pokemon_id: row.pokemon_id,
      //     pokemon_name: row.pokemon_name,
      //     pokemon_img_url: row.pokemon_img_url,
      //     types: row.types,
      //   });
      // });

      // const result = Object.values(trainerMap);
      const result = organizeTrainerData(trainer);

      res.render("trainer", {
        title: "Trainer",
        trainer: result[0],
        capitalizeFirstChar: capitalizeFirstChar,
      });
    }
  } catch (error) {
    console.error("Error occur while render trainer info: ", error);
  }
}

async function addTrainer(req, res) {
  try {
    const { name, gender } = req.body;
    let img_url = "";
    if (gender === "m") {
      img_url =
        "https://cdn.staticneo.com/w/pokemon/8/83/FireRed_LeafGreen_Red.png";
    }
    if (gender === "f") {
      img_url =
        "https://archives.bulbagarden.net/media/upload/4/48/FireRed_LeafGreen_Leaf.png";
    }

    await db.insertTrainer({ name: name, img_url: img_url, gender: gender });
    res.redirect("/trainers");
  } catch (error) {
    console.error("Error occur while add trainer: ", error);
  }
}

async function editTrainerInfo(req, res) {
  try {
    const { id } = req.params;
    const { name, gender } = req.body;
    let img_url = "";
    if (gender === "m") {
      img_url =
        "https://cdn.staticneo.com/w/pokemon/8/83/FireRed_LeafGreen_Red.png";
    }
    if (gender === "f") {
      img_url =
        "https://archives.bulbagarden.net/media/upload/4/48/FireRed_LeafGreen_Leaf.png";
    }

    await db.updateTrainer({
      id: id,
      name: name,
      gender: gender,
      img_url: img_url,
    });
    res.redirect(`/trainers/${id}`);
  } catch (error) {
    console.error("Error occur while edit Trainer info controller: ", error);
  }
}

async function renderAddTrainerPokemonPage(req, res) {
  try {
    const { id } = req.params;

    const trainer = await db.queryTrainer(id);
    const pokemons = await queriesPokemons();

    const organizedTrainerData = organizeTrainerData(trainer)[0];

    res.render("trainerPokemons", {
      title: `${capitalizeFirstChar(
        organizedTrainerData.trainer_name
      )}'s Pokémon`,
      trainer: organizedTrainerData,
      pokemons: pokemons,
      capitalizeFirstChar: capitalizeFirstChar,
    });
  } catch (error) {
    console.error(
      "Error occur while render add trainer pokemon in controller: ",
      error
    );
  }
}

async function updateTrainerPokemon(req, res) {
  try {
    const trainerId = req.params.id;
    const submitPokemonsId = req.body.pokemon_id;

    await db.deleteAllSelectedTrainerPokemon(trainerId);

    if (submitPokemonsId) {
      for (const pokemonId of submitPokemonsId) {
        await db.insertTrainerPokemon(trainerId, parseInt(pokemonId));
      }
    }

    res.redirect(`/trainers/${trainerId}`);
  } catch (error) {
    console.error(
      "Error occur while  update trainer pokemon in controller: ",
      error
    );
  }
}

function organizeTrainerData(trainerRows) {
  const trainerMap = {};
  trainerRows.forEach((row) => {
    if (!trainerMap[row.trainer_id]) {
      trainerMap[row.trainer_id] = {
        trainer_id: row.trainer_id,
        trainer_name: row.trainer_name,
        trainer_img_url: row.trainer_img_url,
        trainer_gender: row.trainer_gender,
        pokemons: [],
      };
    }

    trainerMap[row.trainer_id].pokemons.push({
      pokemon_id: row.pokemon_id,
      pokemon_name: row.pokemon_name,
      pokemon_img_url: row.pokemon_img_url,
      types: row.types,
    });
  });
  return Object.values(trainerMap);
}

module.exports = {
  getTrainersInfo,
  getTrainerInfo,
  addTrainer,
  editTrainerInfo,
  renderAddTrainerPokemonPage,
  updateTrainerPokemon,
};
