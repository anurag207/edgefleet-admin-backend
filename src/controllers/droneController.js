const drones = require("../data/drone");
const {droneFeeds} = require("../data/droneFeed");
const { droneVitals } = require("../data/droneVitals");
const droneActions = require("../data/droneActions");
const {
    loadDroneActions,
    saveDroneActions
  } = require("../data/droneActions");
  

//  Keep updating vitals every 3s --> mock data generator
setInterval(() => {
    droneVitals.forEach((vital) => {
      vital.temperature = +(vital.temperature + (Math.random() - 0.5)).toFixed(1);
      vital.battery = Math.max(0, Math.min(100, vital.battery + Math.floor(Math.random() * 3 - 1)));
      vital.signal = `-${60 + Math.floor(Math.random() * 20)}dBm`;
      vital.updated_at = new Date();
    });
  }, 3000);

exports.getAllDrones = (req, res) => {
  try {
    // Simulate fetching metadata
    const droneMetadata = drones.map(({ id, name, status }) => ({  //filter metadata accroding to fields
      id,
      name,
      status
    }));

    res.status(200).json({
      status: "success",
      message: "Drone metadata fetched successfully",
      data: droneMetadata
    });
  } catch (error) {
    console.error("Error fetching drone metadata:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to fetch drone metadata",
      error: error.message
    });
  }
};

exports.getDroneFeed = (req, res) => {
    // Return drone feed imageBase64 and timestamp
    const droneId = parseInt(req.params.id);
    const feed = droneFeeds.find(f => f.droneId === droneId);
    
    if (!feed) {
      return res.status(404).json({ error: "Drone feed not found" });
    }
    
    // Get current time-based index (changes every 3 seconds)
    const now = new Date();
    const index = Math.floor(now.getTime() / 3000) % feed.images.length; //rotating images
    
    res.json({
      imageBase64: feed.images[index],
      timestamp: now.toISOString()
    });
  };

  // polling vitals feed
exports.getDroneVitals = (req, res) => {
    const droneId = parseInt(req.params.id);
    const vital = droneVitals.find(v => v.drone_id === droneId);
  
    if (!vital) {
      return res.status(404).json({ error: "Drone vitals not found" });
    }
  
    res.json({
      temperature: vital.temperature,
      battery: vital.battery,
      signal: vital.signal,
      timestamp: vital.updated_at.toISOString()
    });
  };

  exports.sendCommandToDrone = (req, res) => {
    const droneId = parseInt(req.params.id);
  const { action } = req.body;

  // Simulated user ID 
  const userId = 101;
  const actions = loadDroneActions(); // Load existing

  // Create new action record
  const newAction = {
    id: actions.length + 1,
    drone_id: droneId,
    user_id: userId,
    action,
    action_current_status: "completed", // as it is immediate
    created_at: new Date(),
    updated_at: new Date(),
  };


actions.push(newAction);
  saveDroneActions(actions); // Write back to file
  console.log("droneActions File Updated"); //droneActions.json file updated with latest action

  res.status(200).json({
    message: `Command '${action}' executed successfully`,
    data: newAction,
  });
  };

  exports.getDroneActions = (req, res) => { // Returns all drone command actions from the JSON file for command history tracking
    const actions = loadDroneActions();
    res.status(200).json({ data: actions });
  };