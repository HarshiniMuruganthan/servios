const express = require("express");
const router = express.Router();

const { searchTechnicians } = require("../controllers/technicianController");

router.get("/search", searchTechnicians);

module.exports = router;