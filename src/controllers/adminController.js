const pool = require("../../db");

const getAdmin = (req, res) => {
  pool.query("Select admin_name from admin", (error, results) => {
    if (error) {
      throw error;
    } else {
      res.status(200).json(results.rows);
    }
  });
};



const getSingleAdmin = (req, res) => {
  //   const str = `Select admin_name from admin where admin_id = ${req.params.id}`
  //   res.send(req.params.id);
  pool.query(
    "Select * from admin where admin_id = $1",
    [req.params.id],
    (error, results) => {
      if (error) {
        throw error;
      } else {
        res.status(200).json(results.rows);
      }
    }
  );
};

module.exports = {
  getAdmin,
  getSingleAdmin,
};
