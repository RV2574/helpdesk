const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Customer", "Agent", "Admin"], // Only these roles are allowed
    required: true,
  },
});

// Hash the password before saving it to the database
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Skip if the password is not modified
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("User", UserSchema);