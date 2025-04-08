const express = require('express');
const router = express.Router();
const Elderly = require('../models/elderly');
const auth = require('../middleware/auth');

// קבלת כל הקשישים
router.get('/', auth, async (req, res) => {
  try {
    const elderly = await Elderly.find();
    res.json(elderly);
  } catch (err) {
    console.error('Elderly route error:', err.message);
    res.status(500).send('Server Error');
  }
});

// הוספת קשיש חדש
router.post('/', auth, async (req, res) => {
  try {
    const newElderly = new Elderly(req.body);
    const elderly = await newElderly.save();
    res.json(elderly);
  } catch (err) {
    console.error('Elderly route error:', err.message);
    res.status(500).send('Server Error');
  }
});

// קבלת קשיש לפי מזהה
router.get('/:id', auth, async (req, res) => {
  try {
    const elderly = await Elderly.findById(req.params.id);
    if (!elderly) return res.status(404).json({ message: 'קשיש לא נמצא' });
    res.json(elderly);
  } catch (err) {
    console.error('Elderly route error:', err.message);
    res.status(500).send('Server Error');
  }
});

// עדכון פרטי קשיש
router.put('/:id', auth, async (req, res) => {
  try {
    const elderly = await Elderly.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!elderly) return res.status(404).json({ message: 'קשיש לא נמצא' });
    res.json(elderly);
  } catch (err) {
    console.error('Elderly route error:', err.message);
    res.status(500).send('Server Error');
  }
});

// מחיקת קשיש
router.delete('/:id', auth, async (req, res) => {
  try {
    const elderly = await Elderly.findByIdAndDelete(req.params.id);
    if (!elderly) return res.status(404).json({ message: 'קשיש לא נמצא' });
    res.json({ message: 'קשיש נמחק בהצלחה' });
  } catch (err) {
    console.error('Elderly route error:', err.message);
    res.status(500).send('Server Error');
  }
});

// חיפוש קשישים לפי מיקום
router.get('/nearby/:distance', auth, async (req, res) => {
  try {
    const { longitude, latitude } = req.query;
    const distance = parseInt(req.params.distance) || 5000; // מרחק במטרים, ברירת מחדל 5 ק"מ

    const elderly = await Elderly.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: distance
        }
      }
    });
    
    res.json(elderly);
  } catch (err) {
    console.error('Elderly route error:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router; 