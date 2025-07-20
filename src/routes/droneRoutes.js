const express = require("express");
const router = express.Router();
const droneController = require("../controllers/droneController");
// GET /api/drones
router.get("/", droneController.getAllDrones);
module.exports = router;