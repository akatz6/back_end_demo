const POOL = require("pg").Pool;

const pool = new POOL({
  user: "aaronkatz",
  host: "localhost",
  database: "demo",
  password: "",
  port: 5432,
});

module.exports = pool;
