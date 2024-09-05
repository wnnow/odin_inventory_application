const { Pool } = require("pg");
require("dotenv").config();

module.exports = new Pool({
  host: "localhost",
  user: process.env.postgreSQLUser,
  database: process.env.postgreSQLdatabase,
  password: process.env.postgreSQLpassword,
  port: 5432,
});

// module.exports = new Pool({
//   connectionString: `postgresql://${process.env.postgreSQLUser}:${process.env.postgreSQLpassword}@localhost:${process.env.PORT}/${process.env.postgreSQLdatabase}`,
// });
