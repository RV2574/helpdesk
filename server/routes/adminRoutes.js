const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/authMiddleware");
const {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
} = require("../controllers/adminController");

// Admin routes

// Route to create a new user (only accessible to Admins)
router.post("/create", authenticate, authorize(["Admin"]), createUser);

// Route to update an existing user by ID (only accessible to Admins)
router.put("/:id", authenticate, authorize(["Admin"]), updateUser);

// Route to delete a user by ID (only accessible to Admins)
router.delete("/:id", authenticate, authorize(["Admin"]), deleteUser);

// Route to fetch all users (only accessible to Admins)
router.get("/all", authenticate, authorize(["Admin"]), getAllUsers);

module.exports = router;