const express = require("express");
const router = express.Router();
const droneController = require("../controllers/droneController");
// GET /api/drones
router.get("/", droneController.getAllDrones);
// GET /api/drones/:id/feed
router.get("/:id/feed", droneController.getDroneFeed);
// GET /api/drones/:id/vitals
router.get("/:id/vitals", droneController.getDroneVitals);
module.exports = router;