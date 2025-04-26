const Ticket = require("../model/Ticket");

// Create a New Ticket
exports.createTicket = async (req, res) => {
  const { title, customerName } = req.body;
  try {
    const ticket = await Ticket.create({ title, customerName });
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Tickets
exports.getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ lastUpdated: -1 }); // Most recent first
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Ticket (e.g., Status or Add Notes)
exports.updateTicket = async (req, res) => {
  const { id } = req.params;
  const { status, note } = req.body;
  try {
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found!" });
    }

    if (status) {
      ticket.status = status;
    }

    if (note) {
      ticket.notes.push({ author: req.body.author, content: note, timestamp: new Date() });
    }

    ticket.lastUpdated = new Date();
    await ticket.save();

    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};