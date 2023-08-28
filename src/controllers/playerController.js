const pool = require("../../db");
const jwt = require("jsonwebtoken");

const getPlayers = (req, res) => {
  const select = `select * from player`;
  pool.query(select, (error, results) => {
    console.log(results.rows[0]);
    if (error) {
      throw error;
    } else {
      return res.status(200).json(results.rows);
    }
  });
};

const getSinglePlayer = (req, res) => {
  pool.query(
    "Select * from player where player_id = $1",
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

const addNewPlayer = (req, res) => {
  const bearer = req.headers.authorization.indexOf("Bearer");
  if (bearer === 0 && req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.WEB_TOKEN);
      const { player_name, first_name, last_name } = req.body;
      if (!player_name || !first_name || !last_name) {
        return res.status(400).send("You are missing data");
      }
      const insert = `insert into player(player_name, first_name, last_name) values('${player_name}','${first_name}', '${last_name}')`;
      pool.query(insert, (err, results) => {
        if (err) {
            return res.status(400).json(err["detail"]);
        } else {
          return res.status(200).send("Insert into table");
        }
      });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }else{
    return res.status(400).send("Authentication Error");
  }
};

module.exports = {
  getPlayers,
  getSinglePlayer,
  addNewPlayer,
};
