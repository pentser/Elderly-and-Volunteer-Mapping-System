const Elderly = require('../models/elderly');

// Get all elderly people
exports.getAllElderly = async (req, res) => {
  try {
    const elderly = await Elderly.find().sort({ createdAt: -1 });
    res.json(elderly);
  } catch (error) {
    console.error('Get all elderly error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get elderly by ID
exports.getElderlyById = async (req, res) => {
  try {
    const elderly = await Elderly.findById(req.params.id);
    if (!elderly) {
      return res.status(404).json({ message: 'Elderly person not found' });
    }
    res.json(elderly);
  } catch (error) {
    console.error('Get elderly by ID error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create new elderly person
exports.createElderly = async (req, res) => {
  try {
    const elderly = new Elderly(req.body);
    await elderly.save();
    res.status(201).json(elderly);
  } catch (error) {
    console.error('Create elderly error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update elderly person
exports.updateElderly = async (req, res) => {
  try {
    const elderly = await Elderly.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!elderly) {
      return res.status(404).json({ message: 'Elderly person not found' });
    }
    res.json(elderly);
  } catch (error) {
    console.error('Update elderly error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update elderly status
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['green', 'yellow', 'red'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const elderly = await Elderly.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!elderly) {
      return res.status(404).json({ message: 'Elderly person not found' });
    }
    res.json(elderly);
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete elderly person
exports.deleteElderly = async (req, res) => {
  try {
    const elderly = await Elderly.findByIdAndDelete(req.params.id);
    if (!elderly) {
      return res.status(404).json({ message: 'Elderly person not found' });
    }
    res.json({ message: 'Elderly person deleted successfully' });
  } catch (error) {
    console.error('Delete elderly error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get elderly by status
exports.getElderlyByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    if (!['green', 'yellow', 'red'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const elderly = await Elderly.find({ status }).sort({ createdAt: -1 });
    res.json(elderly);
  } catch (error) {
    console.error('Get elderly by status error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}; 