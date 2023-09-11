const express = require("express");
const router = express.Router();
const {
  getPlayers,
  getSinglePlayer,
  addNewPlayer,
  editSinglePlayer
} = require("../controllers/playerController");

router.get("/players", getPlayers);
router.get("/player/:id", getSinglePlayer);
router.post("/players", addNewPlayer);
router.put("/player/:id", editSinglePlayer);

module.exports = router;
