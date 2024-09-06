const pool = require("./pool");

async function queryTrainers() {
  try {
    const { rows } = await pool.query(`
      SELECT * FROM trainer_info
      `);

    return rows;
  } catch (error) {
    console.error("Error occur while fetching trainers: ", error);
  }
}

async function queryTrainer(trainerId) {
  try {
    const { rows } = await pool.query(
      `SELECT
        ti.id AS trainer_id,
        ti.name AS trainer_name,
        ti.img_url AS trainer_img_url,
        pi.serial_id AS pokemon_id,
        pi.name AS pokemon_name,
        pi.img_url AS pokemon_img_url,
        ARRAY_AGG(t.name) AS types
    FROM
        trainer_info ti
    JOIN
        trainer_pokemon tp ON ti.id = tp.trainer_id
    JOIN
        pokemon_info pi ON tp.pokemon_id = pi.serial_id
    JOIN
        pokemon_type pt ON pi.serial_id = pt.pokemon_id
    JOIN
        type t ON pt.type_id = t.serial_id
    WHERE
        ti.id = ($1)
    GROUP BY
        ti.id, pi.serial_id;`,
      [trainerId]
    );

    if (rows.length === 0) {
      return rows;
    } else {
      const trainerMap = {};
      rows.forEach((row) => {
        if (!trainerMap[row.trainer_id]) {
          trainerMap[row.trainer_id] = {
            trainer_id: row.trainer_id,
            trainer_name: row.trainer_name,
            trainer_img_url: row.trainer_img_url,
            pokemons: [],
          };
        }

        // Add the Pokémon info to the trainer's 'pokemons' array
        trainerMap[row.trainer_id].pokemons.push({
          pokemon_id: row.pokemon_id,
          pokemon_name: row.pokemon_name,
          pokemon_img_url: row.pokemon_img_url,
          types: row.types,
        });
      });

      const result = Object.values(trainerMap);
      return result[0];
    }
  } catch (error) {
    console.error("Error occur while fetching trainer: ", error);
  }
}
queryTrainer(13);

module.exports = {
  queryTrainer,
  queryTrainers,
};
