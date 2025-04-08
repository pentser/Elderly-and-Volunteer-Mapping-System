const express = require('express');
const router = express.Router();
const Visit = require('../models/visit');
const auth = require('../middleware/auth');

// קבלת כל הביקורים
router.get('/', auth, async (req, res) => {
  try {
    const visits = await Visit.find()
      .populate('elderly', 'firstName lastName')
      .populate('volunteer', 'firstName lastName');
    res.json(visits);
  } catch (err) {
    console.error('Visit route error:', err.message);
    res.status(500).send('Server Error');
  }
});

// יצירת ביקור חדש
router.post('/', auth, async (req, res) => {
  try {
    const newVisit = new Visit(req.body);
    const visit = await newVisit.save();
    res.json(visit);
  } catch (err) {
    console.error('Visit route error:', err.message);
    res.status(500).send('Server Error');
  }
});

// עדכון סטטוס ביקור
router.put('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const visit = await Visit.findByIdAndUpdate(
      req.params.id,
      { 
        status,
        ...(status === 'completed' ? {
          actualEndTime: new Date()
        } : {})
      },
      { new: true }
    );
    
    if (!visit) return res.status(404).json({ message: 'ביקור לא נמצא' });
    res.json(visit);
  } catch (err) {
    console.error('Visit route error:', err.message);
    res.status(500).send('Server Error');
  }
});

// קבלת סטטיסטיקות ביקורים
router.get('/stats', auth, async (req, res) => {
  try {
    const stats = await Visit.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    res.json(stats);
  } catch (err) {
    console.error('Visit route error:', err.message);
    res.status(500).send('Server Error');
  }
});

// קבלת ביקורים לפי מתנדב
router.get('/volunteer/:volunteerId', auth, async (req, res) => {
  try {
    const visits = await Visit.find({ volunteer: req.params.volunteerId })
      .populate('elderly', 'firstName lastName')
      .sort({ scheduledTime: -1 });
    res.json(visits);
  } catch (err) {
    console.error('Visit route error:', err.message);
    res.status(500).send('Server Error');
  }
});

// קבלת ביקורים לפי קשיש
router.get('/elderly/:elderlyId', auth, async (req, res) => {
  try {
    const visits = await Visit.find({ elderly: req.params.elderlyId })
      .populate('volunteer', 'firstName lastName')
      .sort({ scheduledTime: -1 });
    res.json(visits);
  } catch (err) {
    console.error('Visit route error:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router; 