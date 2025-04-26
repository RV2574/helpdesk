const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
require('dotenv').config();

// Connect to the database
connectDB();

// Importing routes
const authRoutes = require("./routes/authRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Middleware to handle JSON data and enable CORS
app.use(express.json());
app.use(cors());

// Set CSP Headers
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src * 'unsafe-inline' data: blob:;");
  next();
});




// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/admin", adminRoutes);
// Basic route to check if API is running
app.get("/", (req, res) => {
  res.send("API is running");
});

// Set the server to listen on a specific port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
