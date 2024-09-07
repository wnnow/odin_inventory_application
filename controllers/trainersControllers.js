const db = require("../db/trainerQueries");
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
      const trainerMap = {};
      trainer.forEach((row) => {
        if (!trainerMap[row.trainer_id]) {
          trainerMap[row.trainer_id] = {
            trainer_id: row.trainer_id,
            trainer_name: row.trainer_name,
            trainer_img_url: row.trainer_img_url,
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

      const result = Object.values(trainerMap);
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

// https://cdn.staticneo.com/w/pokemon/8/83/FireRed_LeafGreen_Red.png
// https://archives.bulbagarden.net/media/upload/4/48/FireRed_LeafGreen_Leaf.png

module.exports = {
  getTrainersInfo,
  getTrainerInfo,
  addTrainer,
};
