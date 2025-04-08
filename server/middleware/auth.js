const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // קבלת הטוקן מה-header
  const token = req.header('x-auth-token');

  // בדיקה אם קיים טוקן
  if (!token) {
    return res.status(401).json({ message: 'אין טוקן הרשאה, הגישה נדחתה' });
  }

  try {
    // אימות הטוקן
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'טוקן לא תקין' });
  }
}; 