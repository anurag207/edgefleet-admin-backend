require("dotenv").config(); 

const express = require("express");
const droneRoutes = require("./routes/droneRoutes");


const app = express();
const PORT = process.env.PORT || 1900;

app.use("/api/drones", droneRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("<h1>Server is running 🎉</h1>");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});
