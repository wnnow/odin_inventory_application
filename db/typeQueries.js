const pool = require("./pool");

async function queriesTypes() {
  try {
    const { rows } = await pool.query(`SELECT name FROM type`);

    return rows;
  } catch (error) {
    console.error("Error occur while fetch types: ", error);
  }
}

async function queryPokemonType(typeName) {
  try {
    const { rows } = await pool.query(
      `
      SELECT
        pi.serial_id,
        pi.name,
        pi.img_url,
        ARRAY_AGG(t.name) AS types
      FROM
        pokemon_info pi
      JOIN
        pokemon_type pt ON pi.serial_id = pt.pokemon_id
      JOIN
        type t ON pt.type_id = t.serial_id
      GROUP BY
        pi.serial_id, pi.name, pi.img_url
      HAVING
        $1 = ANY(ARRAY_AGG(t.name))
      ORDER BY
        pi.serial_id;
    `,
      [typeName]
    );

    return rows;
  } catch (error) {
    console.error("Error occur while fetch pokemon in type: ", error);
  }
}

module.exports = {
  queriesTypes,
  queryPokemonType,
};

// SELECT
//     pi.serial_id,
//     pi.name,
//     pi.img_url,
//     ARRAY_AGG(t.name) AS types
// FROM
//     pokemon_info pi
// JOIN
//     pokemon_type pt ON pi.serial_id = pt.pokemon_id
// JOIN
//     type t ON pt.type_id = t.serial_id
// GROUP BY
//     pi.serial_id, pi.name, pi.img_url
// HAVING
//     'fire' = ANY(ARRAY_AGG(t.name));
