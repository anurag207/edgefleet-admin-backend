# 🚀 EdgeFleet.AI – Admin Panel (Backend)

A real-time backend server built using **Node.js**, **Express**, and **Socket.IO** to power the EdgeFleet.AI Admin Panel. It handles drone data simulation, authentication, image feed streaming, vitals monitoring, global commands, and mission log tracking — all with in-memory storage and JSON persistence.

---

## 🛠️ Tech Stack

| Layer       | Technology               |
|-------------|--------------------------|
| Server      | Node.js, Express         |
| Realtime    | Socket.IO, HTTP Server   |
| Auth        | Local authentication + Bcrypt |
| Data Layer  | In-memory store + JSON files |
| API Format  | REST                     |

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/edgefleet-admin-backend
cd edgefleet-admin-backend

2. Install Dependencies
bash
npm install
3. Configure Environment
Create a .env file in the root and add:

.env
PORT=1900
You can use any available port; default is 1900.

4. Start Development Server

npm start

🔐 Admin Login for Testing
Use the following dummy credentials for local development:

Email: admin1@example.com
Password: 123456


🧱 Project Structure

src/
├── controllers/
│   ├── authController.js        # Handles login logic
│   └── droneController.js       # Handles drone data, feeds, vitals, commands
│
├── data/                        # Simulated in-memory + JSON data
│   ├── drone.js                 # Drone metadata
│   ├── droneFeed.js             # Base64 images for feed (rotates every 3s)
│   ├── droneVitals.js           # Mock vitals (updates every 3s via setInterval)
│   ├── droneActions.js          # Command log write/read (persisted in JSON)
│   ├── droneActions.json        # Stores drone action history
│   ├── missionLogs.js           # Sample logs with lat/lng/timestamp
│   └── users.js                 # Admin users with hashed passwords (bcrypt)
│
├── routes/
│   ├── authRoutes.js            # POST /api/auth/login
│   └── droneRoutes.js           # Drone data, feed, vitals, commands
│
└── server.js                    # Main app + Socket.IO setup
🔌 API Endpoints
All routes are prefixed with /api.

📦 Drone Routes
Method	Route	Description
GET	/api/drones	Fetch all drone metadata (filtered)
GET	/api/drones/:id/feed	Get drone image feed (base64)
GET	/api/drones/:id/vitals	Get drone vitals (temp, battery, signal)
POST	/api/drones/:id/command	Send a global command (pause/return)
GET	/api/drones/logs	Get mission logs (timestamp, lat/lng)

🔐 Auth Routes
Method	Route	Description
POST	/api/auth/login	Admin login (email/pass)

📡 Realtime Architecture
Drone Image Feed (Socket.IO)

Simulated images rotate every 3 seconds (via index).

Backend emits image feed to frontend via Socket.IO:

Efficient and real-time (no polling)

Consumed in frontend via DroneFeed.jsx

Drone Vitals (Polling)

Backend updates vitals (temperature, battery, signal) every 3s using Math.random().

Frontend polls every 3 seconds to display updated vitals via DroneVitals.jsx.

# Architecture Diagram

Client (React Frontend)
      │
      ├── REST API Calls ──────▶ Express Server
      │                          ├── /api/drones, /api/auth
      │                          └── Controllers (auth, drone)
      │
      └── WebSocket (Socket.IO) ─▶ Real-time feed from server
                                 
Server (Node.js + Express)
      ├── Simulated Data:
      │     • drone.js
      │     • droneFeed.js (rotating)
      │     • droneVitals.js (updated with random data)
      │     • users.js (admin creds)
      │
      ├── Persisted Logs:
      │     • droneActions.js (writes to droneActions.json)
      │     • missionLogs.js

      


Design Decisions
1. Socket.IO is used for live feed (more efficient than polling).

2. Polling is used for vitals due to smaller data size.

3. In-memory + JSON used instead of a real database for simplicity.

4. Admin credentials are stored hashed using bcrypt.

5. Separation of concern with routes, controllers, and data layers.

6. Realistic simulation with setInterval, base64 images, and mock vitals.

Features
1. Simulated drone list and details

2. Real-time image feed (via Socket.IO)

3. Simulated vitals with polling

4. Global drone commands (pause/return)

5. Mission logs with position & timestamp

6. Role-based login with password hashing

7. Logging incoming API Requests to file

7. Data persistence for commands using JSON

Future Improvements

1. Integrate User Id with drone actions

2. Use current_drone_status for status when an action by drone is being executed

2. Use JWT + refresh tokens for secure auth

4. Add support for drone location tracking on maps




