const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const technicianRoutes = require("./routes/technicianRoutes");

const http = require("http");          // NEW
const { Server } = require("socket.io"); // NEW

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use("/api/technicians", technicianRoutes);

// ROUTES
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/repairs", require("./routes/repairRoutes"));
app.use("/api/bids", require("./routes/bidRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

app.get("/", (req, res) => {
  res.send("Repair Marketplace API Running");
});


// 🔹 CREATE HTTP SERVER
const server = http.createServer(app);

// 🔹 SOCKET.IO
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("sendMessage", (data) => {
    console.log("Message received:", data);

    // send message to all connected users
    io.emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 5000;

// 🔹 IMPORTANT: server.listen instead of app.listen
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});