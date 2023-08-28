const express = require("express");
const router = express.Router();
const { getPlayers, getSinglePlayer,addNewPlayer } = require("../controllers/playerController");

router.get("/players", getPlayers);
router.get("/players/:id", getSinglePlayer);
router.post("/players", addNewPlayer);

module.exports = router;
