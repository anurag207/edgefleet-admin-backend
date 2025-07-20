const missionLogs = [
    {
      id: 1,
      droneId: 1,
      missionType: "inspection",
      timestamp: new Date().toISOString(),
      location: {
        latitude: 28.6139,
        longitude: 77.2090, // Delhi
      },
    },
    {
      id: 2,
      droneId: 2,
      missionType: "inspection",
      timestamp: new Date().toISOString(),
      location: {
        latitude: 19.0760,
        longitude: 72.8777, // Mumbai
      },
    },
    {
      id: 3,
      droneId: 3,
      missionType: "inspection",
      timestamp: new Date().toISOString(),
      location: {
        latitude: 12.9716,
        longitude: 77.5946, // Bengaluru
      },
    },
    {
      id: 4,
      droneId: 4,
      missionType: "inspection",
      timestamp: new Date().toISOString(),
      location: {
        latitude: 13.0827,
        longitude: 80.2707, // Chennai
      },
    },
    {
      id: 5,
      droneId: 5,
      missionType: "inspection",
      timestamp: new Date().toISOString(),
      location: {
        latitude: 22.5726,
        longitude: 88.3639, // Kolkata
      },
    },
    {
      id: 6,
      droneId: 6,
      missionType: "inspection",
      timestamp: new Date().toISOString(),
      location: {
        latitude: 23.0225,
        longitude: 72.5714, // Ahmedabad
      },
    },
  ];
  
  module.exports = { missionLogs };
  