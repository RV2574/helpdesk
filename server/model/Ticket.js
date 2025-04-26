const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Active", "Pending", "Closed"], // Ticket statuses
    default: "Active", // Default status when created
  },
  customerName: {
    type: String,
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now, // Automatically set the date when a ticket is created
  },
  notes: [
    {
      author: String, // Who added the note (Customer, Agent, or Admin)
      content: String, // The note's text
      timestamp: { type: Date, default: Date.now }, // Time when the note was added
    },
  ],
});

module.exports = mongoose.model("Ticket", TicketSchema);