const pool = require("../../db");
const bcrypt = require("bcrypt");

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

const newAdmin = async (req, res) => {
  const { admin_name, admin_password, first_name, last_name } = req.body;
  if (!admin_name || !admin_password || !first_name || !last_name) {
    return res.status(400).send("You missed a required field");
  }
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!re.exec(admin_name)) {
    return res.status(400).send("Email is not in proper form");
  }
  if (res.headersSent === true) {
    return res.status(200).send("Insert into table");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(admin_password, salt);
  const insert =  `insert into admin(admin_name, admin_password, first_name, last_name) values('${admin_name}', '${hashedPassword}', '${first_name}', '${last_name}')`
  pool.query(
    insert,
    (error, results) => {
      if (error) {
        return res.status(400).json(error["detail"]);
      } else {
        return res.status(200).send("Insert into table");
      }
    }
  );
};

module.exports = {
  getAdmin,
  getSingleAdmin,
  newAdmin,
};
