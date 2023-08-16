const pool = require("../../db");

const getAdmin = (req, res) => {
  pool.query("Select * from admin", (error, results) => {
    if (error) {
      throw error;
    } else {
      res.status(200).json(results.rows);
    }
  });
};


module.exports = {
  getAdmin,
};
