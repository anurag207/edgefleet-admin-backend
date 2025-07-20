require("dotenv").config(); 

const express = require("express");
const droneRoutes = require("./routes/droneRoutes");
const cors = require("cors");
const { droneFeeds } = require("./data/droneFeed");
const { droneVitals } = require("./data/droneVitals");

const app = express();
const http = require("http").createServer(app);

const { Server } = require("socket.io");
const io = new Server(http, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  }
});

app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true
  }));

app.use("/api/drones", droneRoutes);


app.get("/", (req, res) => {
  res.send("<h1>Server is running 🎉</h1>");
});


io.on("connection", (socket) => {
  console.log("Client connected via WebSocket");

  // Listen for subscription event from frontend
  socket.on("subscribeToDrone", (droneId) => {
    console.log(`Subscribed to drone: ${droneId}`);

    // Emit image every 3 seconds for that drone
    const intervalId = setInterval(() => {
      const feed = droneFeeds.find(f => f.droneId === parseInt(droneId));
      if (!feed || feed.images.length === 0) return;

      const now = new Date();
      const index = Math.floor(now.getTime() / 3000) % feed.images.length;

      socket.emit("droneFeed", {
        imageBase64: feed.images[index],
        timestamp: now.toISOString()
      });
    }, 3000);

    // Stop interval when client disconnects
    socket.on("disconnect", () => {
      console.log(`Disconnected from drone ${droneId}`);
      clearInterval(intervalId);
    });
  });
});

const PORT = process.env.PORT || 1900;
http.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

