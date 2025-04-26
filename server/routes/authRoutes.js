const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../model/User"); 
require("dotenv").config(); // Load environment variables

// User Registration Route
router.post("/register", registerUser);

// User Login Route
router.post("/login", loginUser);

// Get User Info Route
router.get("/me", async (req, res) => {
  try {
    // Step 1: Extract token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Split "Bearer <token>"
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Token is missing" });
    }

    // Step 2: Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT_SECRET is correctly set in .env

    // Step 3: Retrieve user details from the database using the decoded ID
    const user = await User.findById(decoded.id); // `decoded.id` is the payload from jwt.sign()
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Step 4: Respond with the user's details
    res.json({ username: user.username, role: user.role });
  } catch (err) {
    // Handle errors and respond with a meaningful message
    console.error("Error in /me route:", err.message || err);
    res.status(500).json({ message: "Server error occurred" });
  }
});

module.exports = router;
