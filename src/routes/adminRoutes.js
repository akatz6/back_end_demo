const express = require("express");
const router = express.Router();
const { getAdmin, getSingleAdmin, newAdmin } = require("../controllers/adminController");

router.get("/admin", getAdmin);
router.get("/admin/:id", getSingleAdmin);
router.post("/admin", newAdmin);

module.exports = router;
