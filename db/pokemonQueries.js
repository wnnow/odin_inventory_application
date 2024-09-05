const pool = require("./pool");

async function queriesPokemons() {
  try {
    const { rows } = await pool.query(
      `SELECT 
    pi.serial_id,
    pi.name,
    pi.img_url,
    ARRAY_AGG(type.name) AS types
FROM 
    pokemon_info AS pi
JOIN 
    pokemon_type AS pt ON pi.serial_id = pt.pokemon_id
JOIN 
    type ON type.serial_id = pt.type_id
GROUP BY 
    pi.serial_id, pi.name, pi.img_url
ORDER BY 
    pi.serial_id;`
    );

    return rows;
  } catch (error) {
    console.error("Error fetching pokemons: ", error);
    throw new Error("Could not retrieve pokemons");
  }
}

async function insertUsername(username) {
  await pool.query("INSERT INTO usernames (username) VALUES ($1)", [username]);
}

module.exports = {
  queriesPokemons,
  insertUsername,
};
