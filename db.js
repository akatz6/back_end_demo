const Pool = require("pg").Pool;

const pool = new Pool({
  user: "aaronkatz",
  host: "localhost",
  database: "demo",
  password: "",
  port: 5432,
});

module.exports = pool;
