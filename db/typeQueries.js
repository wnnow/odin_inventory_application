const pool = require("./pool");

async function queriesTypes() {
  try {
    const { rows } = await pool.query(`SELECT name FROM type`);
    console.log(rows);
    return rows;
  } catch (error) {
    console.error("Error occur while fetch types: ", error);
  }
}

queriesTypes();

module.exports = {
  queriesTypes,
};
