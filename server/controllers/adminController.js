const User = require("../model/User");

const createUser = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Validation
    if (!username || !password || !role) {
      return res.status(400).json({ message: "Missing required fields!" });
    }

    // Check for duplicate username
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists!" });
    }

    // Create new user
    const newUser = new User({ username, password, role });
    await newUser.save();

    res.status(201).json({ message: "User created successfully!", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, role } = req.body;

  try {
    // Validate input
    if (!username && !role) {
      return res.status(400).json({ message: "No fields provided to update!" });
    }

    // Find user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Update fields
    if (username) user.username = username;
    if (role) user.role = role;

    await user.save();

    res.status(200).json({ message: "User updated successfully!", user });
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete user by ID
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}); // Fetch all users
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
};

module.exports = { createUser, updateUser, deleteUser, getAllUsers };