const pool = require("../../db");
const jwt = require("jsonwebtoken");

const getPlayers = (req, res) => {
  const select = `select * from player`;
  pool.query(select, (error, results) => {
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
      const { player_name, first_name, last_name, img } = req.body;
      if (!player_name || !first_name || !last_name) {
        return res.status(400).send("You are missing data");
      }
      const insert = `insert into player(player_name, first_name, last_name, img) values('${player_name}','${first_name}', '${last_name}', '${img}')`;
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
  } else {
    return res.status(400).send("Authentication Error");
  }
};

const editSinglePlayer = (req, res) => {
  const bearer = req.headers.authorization;
  if (bearer) {
    const { player_name, first_name, last_name } = req.body;
    if (!player_name || !first_name || !last_name) {
      return res.status(400).send("You are missing data");
    }
    pool.query(
      `update player set player_name = '${player_name}', first_name = '${first_name}', last_name = '${last_name}' where player_id = ${req.params.id}`,
      (error, results) => {
        if (error) {
          throw error;
        } else {
          console.log(results.rows);
          res.status(200).send(`${player_name} has been updated`);
        }
      }
    );
  } else {
    res.status(400).send("Player not found");
  }
};

module.exports = {
  getPlayers,
  getSinglePlayer,
  addNewPlayer,
  editSinglePlayer,
};
