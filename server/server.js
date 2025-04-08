require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const User = require('./models/user');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// בדיקת חיבור בסיסית
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working' });
});

// נתיב התחברות בסיסי
app.post('/api/auth/login', async (req, res) => {
  console.log('Login attempt:', req.body);
  
  try {
    const { email, password } = req.body;

    // בדיקת קלט
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'חסרים פרטי התחברות',
        details: { email: !!email, password: !!password }
      });
    }

    // חיפוש משתמש
    const user = await User.findOne({ email: email.toLowerCase() });
    console.log('User found:', !!user);

    if (!user) {
      return res.status(400).json({ message: 'משתמש לא קיים' });
    }

    // בדיקת סיסמה
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: 'סיסמה שגויה' });
    }

    // יצירת טוקן
    const token = 'test-token'; // בשלב זה נשתמש בטוקן פשוט לבדיקה

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'שגיאת שרת', error: error.message });
  }
});

// יצירת משתמש ראשון לבדיקה
const createInitialUser = async () => {
  try {
    const existingUser = await User.findOne({ email: 'admin@elderly.com' });
    
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash('Admin123!', 10);
      
      const newUser = new User({
        email: 'admin@elderly.com',
        password: hashedPassword,
        firstName: 'מנהל',
        lastName: 'ראשי',
        role: 'admin'
      });

      await newUser.save();
      console.log('Initial admin user created successfully');
    }
  } catch (error) {
    console.error('Error creating initial user:', error);
  }
};

// התחברות למסד הנתונים
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/elderly-volunteer-system')
  .then(() => {
    console.log('Connected to MongoDB');
    createInitialUser();
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/elderly', require('./routes/elderly'));
app.use('/api/volunteers', require('./routes/volunteer'));
app.use('/api/visits', require('./routes/visits'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 