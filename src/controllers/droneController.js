const drones = require("../data/drone");

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
