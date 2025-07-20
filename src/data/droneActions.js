
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "droneActions.json");

// Load existing data from JSON file
function loadDroneActions() {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Failed to load droneActions:", err);
    return [];
  }
}

// Write updated actions to file
function saveDroneActions(actions) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(actions, null, 2));
  } catch (err) {
    console.error("Failed to save droneActions:", err);
  }
}

module.exports = {
  loadDroneActions,
  saveDroneActions,
  filePath,
};
