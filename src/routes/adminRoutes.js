const express = require("express");
const router = express.Router();
const { getAdmin, getSingleAdmin } = require("../controllers/adminController");

router.get("/admin", getAdmin);
router.get("/admin/:id", getSingleAdmin);

module.exports = router;
