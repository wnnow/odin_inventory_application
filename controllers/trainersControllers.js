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
      res.render("trainer", {
        title: "Trainer",
        trainer: trainer,
        capitalizeFirstChar: capitalizeFirstChar,
      });
    }
  } catch (error) {
    console.error("Error occur while render trainer info: ", error);
  }
}

module.exports = {
  getTrainersInfo,
  getTrainerInfo,
};
