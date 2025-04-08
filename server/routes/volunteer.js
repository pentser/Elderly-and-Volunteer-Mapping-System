const express = require('express');
const router = express.Router();
const Volunteer = require('../models/volunteer');
const auth = require('../middleware/auth');

// קבלת כל המתנדבים
router.get('/', auth, async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.json(volunteers);
  } catch (err) {
    console.error('Volunteer route error:', err.message);
    res.status(500).send('Server Error');
  }
});

// הוספת מתנדב חדש
router.post('/', auth, async (req, res) => {
  try {
    const newVolunteer = new Volunteer(req.body);
    const volunteer = await newVolunteer.save();
    res.json(volunteer);
  } catch (err) {
    console.error('Volunteer route error:', err.message);
    res.status(500).send('Server Error');
  }
});

// קבלת מתנדב לפי מזהה
router.get('/:id', auth, async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);
    if (!volunteer) return res.status(404).json({ message: 'מתנדב לא נמצא' });
    res.json(volunteer);
  } catch (err) {
    console.error('Volunteer route error:', err.message);
    res.status(500).send('Server Error');
  }
});

// עדכון פרטי מתנדב
router.put('/:id', auth, async (req, res) => {
  try {
    const volunteer = await Volunteer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!volunteer) return res.status(404).json({ message: 'מתנדב לא נמצא' });
    res.json(volunteer);
  } catch (err) {
    console.error('Volunteer route error:', err.message);
    res.status(500).send('Server Error');
  }
});

// מחיקת מתנדב
router.delete('/:id', auth, async (req, res) => {
  try {
    const volunteer = await Volunteer.findByIdAndDelete(req.params.id);
    if (!volunteer) return res.status(404).json({ message: 'מתנדב לא נמצא' });
    res.json({ message: 'מתנדב נמחק בהצלחה' });
  } catch (err) {
    console.error('Volunteer route error:', err.message);
    res.status(500).send('Server Error');
  }
});

// חיפוש מתנדבים זמינים לפי מיקום
router.get('/available/:distance', auth, async (req, res) => {
  try {
    const { longitude, latitude, day, startTime, endTime } = req.query;
    const distance = parseInt(req.params.distance) || 5000; // מרחק במטרים, ברירת מחדל 5 ק"מ

    const volunteers = await Volunteer.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: distance
        }
      },
      status: 'active',
      'availability.day': day,
      'availability.startTime': { $lte: startTime },
      'availability.endTime': { $gte: endTime }
    });
    
    res.json(volunteers);
  } catch (err) {
    console.error('Volunteer route error:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router; 