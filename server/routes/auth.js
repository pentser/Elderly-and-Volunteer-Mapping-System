const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const auth = require('../middleware/auth');

// הרשמת משתמש ראשון (מנהל מערכת)
router.post('/register/admin', async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // בדיקה אם כבר קיים מנהל מערכת
    const adminExists = await User.findOne({ role: 'admin' });
    if (adminExists) {
      return res.status(400).json({ message: 'מנהל מערכת כבר קיים' });
    }

    // בדיקה אם המשתמש קיים
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'משתמש כבר קיים' });
    }

    // יצירת משתמש חדש
    user = new User({
      email,
      password,
      firstName,
      lastName,
      role: 'admin'
    });

    // הצפנת הסיסמה
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // יצירת טוקן
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error('Registration error:', err.message);
    res.status(500).send('Server Error');
  }
});

// הרשמת משתמש חדש
router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName, role } = req.body;

    // בדיקה אם המשתמש קיים
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'משתמש כבר קיים' });
    }

    // יצירת משתמש חדש
    user = new User({
      email,
      password,
      firstName,
      lastName,
      role
    });

    // הצפנת הסיסמה
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // יצירת טוקן
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error('Authentication error:', err.message);
    res.status(500).send('Server Error');
  }
});

// התחברות משתמש
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // בדיקה אם המשתמש קיים
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'אישורים לא תקינים' });
    }

    // בדיקת סיסמה
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'אישורים לא תקינים' });
    }

    // יצירת טוקן
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error('Authentication error:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router; 