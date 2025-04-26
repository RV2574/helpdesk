const jwt = require("jsonwebtoken");

// Authenticate middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized! No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user information to the request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed!" });
  }
};

// Authorize middleware
const authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) return res.status(403).json({ message: "Forbidden! You do not have access." });
  next();
};

module.exports = { authenticate, authorize };