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
        ti.gender AS trainer_gender,
        pi.serial_id AS pokemon_id,
        pi.name AS pokemon_name,
        pi.img_url AS pokemon_img_url,
        COALESCE(ARRAY_AGG(t.name), '{}') AS types
    FROM
        trainer_info ti
    LEFT JOIN
        trainer_pokemon tp ON ti.id = tp.trainer_id
    LEFT JOIN
        pokemon_info pi ON tp.pokemon_id = pi.serial_id
    LEFT JOIN
        pokemon_type pt ON pi.serial_id = pt.pokemon_id
    LEFT JOIN
        type t ON pt.type_id = t.serial_id
    WHERE
        ti.id = $1
    GROUP BY
        ti.id, pi.serial_id;`,
      [trainerId]
    );

    return rows;
  } catch (error) {
    console.error("Error occur while fetching trainer: ", error);
  }
}

async function insertTrainer(trainerInfo) {
  try {
    const { name, img_url, gender } = trainerInfo;
    await pool.query(
      `
      INSERT INTO trainer_info (name, img_url, gender) VALUES ($1,$2,$3)
      `,
      [name, img_url, gender]
    );
  } catch (error) {
    console.error("Error occur while inserting trainer info: ", error);
  }
}

async function updateTrainer(trainerInfo) {
  try {
    const { id, name, gender, img_url } = trainerInfo;

    await pool.query(
      `UPDATE trainer_info 
      SET name = ($2), gender = ($3), img_url = ($4)
      WHERE id = ($1)`,
      [id, name, gender, img_url]
    );
  } catch (error) {
    console.error("Error occur while query update Trainer info: ", error);
  }
}

module.exports = {
  queryTrainer,
  queryTrainers,
  insertTrainer,
  updateTrainer,
};
