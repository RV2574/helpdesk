const express = require("express");
const { createTicket, getTickets, updateTicket } = require("../controllers/ticketController");
const { authenticate, authorize } = require("../middleware/authMiddleware"); // Import the middleware

const router = express.Router();

// Create Ticket (only Customers)
router.post("/create", authenticate, authorize(["Customer"]), createTicket);

// Get All Tickets (only Agents and Admins)
router.get("/", authenticate, authorize(["Agent", "Admin"]), getTickets);

// Update Ticket (only Agents and Admins)
router.put("/:id", authenticate, authorize(["Agent", "Admin"]), updateTicket);

module.exports = router;