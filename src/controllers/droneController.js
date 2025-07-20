const drones = require("../data/drone");
const {droneFeeds} = require("../data/droneFeed")

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
