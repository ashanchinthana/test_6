const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Ticket = require('../models/ticket');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const sanitizedOriginalName = file.originalname.replace(/\s+/g, '-');
    cb(null, `${timestamp}-${sanitizedOriginalName}`);
  }
});

const upload = multer({ storage });

router.post('/submit', upload.single('paymentSlip'), async (req, res) => {
  try {
    const { name, userId } = req.body;

    if (!name || !userId || !req.file) {
      return res.status(400).json({ message: 'Name, userId, and payment slip are required.' });
    }

    // Validate userId: must be exactly 12 digits
    if (!/^\d{12}$/.test(userId.trim())) {
      return res.status(400).json({ message: 'User ID must be exactly 12 numbers.' });
    }

    const storedFilePath = path.posix.join('uploads', req.file.filename);

    const ticket = new Ticket({
      name,
      userId,
      paymentSlip: storedFilePath
    });

    await ticket.save();

    res.status(201).json({ message: 'Ticket submitted successfully and pending approval.', ticketId: ticket._id });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit ticket.', error: error.message });
  }
});

router.get('/admin/pending', async (req, res) => {
  try {
    const pendingTickets = await Ticket.find({ status: 'pending' }).sort({ createdAt: -1 });
    res.status(200).json(pendingTickets);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch pending tickets.', error: error.message });
  }
});

router.get('/admin/approved', async (req, res) => {
  try {
    const approvedTickets = await Ticket.find({ status: 'confirmed' }).sort({ createdAt: -1 });
    res.status(200).json(approvedTickets);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch approved tickets.', error: error.message });
  }
});

router.get('/admin/rejected', async (req, res) => {
  try {
    const rejectedTickets = await Ticket.find({ status: 'rejected' }).sort({ createdAt: -1 });
    res.status(200).json(rejectedTickets);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch rejected tickets.', error: error.message });
  }
});

router.post('/admin/approve/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found.' });
    }

    if (ticket.status !== 'pending') {
      return res.status(400).json({ message: 'Only pending tickets can be approved.' });
    }

    // Generate sequential ticket number starting from 1
    const allConfirmed = await Ticket.find({ status: 'confirmed', ticketNumber: { $exists: true, $ne: null } });
    
    let nextNumber = 1;
    if (allConfirmed.length > 0) {
      // Find the highest ticket number
      const numbers = allConfirmed
        .map(t => {
          const match = t.ticketNumber.toString().match(/\d+/);
          return match ? parseInt(match[0]) : 0;
        })
        .filter(n => n > 0);
      
      if (numbers.length > 0) {
        nextNumber = Math.max(...numbers) + 1;
      }
    }

    ticket.ticketNumber = nextNumber.toString();
    ticket.status = 'confirmed';
    await ticket.save();

    res.status(200).json({ message: 'Ticket approved successfully.', ticketNumber: ticket.ticketNumber });
  } catch (error) {
    res.status(500).json({ message: 'Failed to approve ticket.', error: error.message });
  }
});

router.post('/admin/reject/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found.' });
    }

    if (ticket.status !== 'pending') {
      return res.status(400).json({ message: 'Only pending tickets can be rejected.' });
    }

    ticket.status = 'rejected';
    await ticket.save();

    res.status(200).json({ message: 'Ticket rejected successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to reject ticket.', error: error.message });
  }
});

router.get('/ticket/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found.' });
    }

    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch ticket.', error: error.message });
  }
});

router.delete('/admin/ticket/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found.' });
    }

    // Only allow deletion of approved or rejected tickets
    if (ticket.status === 'pending') {
      return res.status(400).json({ message: 'Cannot delete pending tickets. Reject them instead.' });
    }

    // Delete the payment slip file if it exists
    if (ticket.paymentSlip) {
      const slipPath = path.join(__dirname, '..', ticket.paymentSlip);
      try {
        if (fs.existsSync(slipPath)) {
          fs.unlinkSync(slipPath);
        }
      } catch (fileError) {
        console.error('Error deleting payment slip file:', fileError);
      }
    }

    await Ticket.findByIdAndDelete(id);

    res.status(200).json({ message: 'Ticket deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete ticket.', error: error.message });
  }
});

module.exports = router;

