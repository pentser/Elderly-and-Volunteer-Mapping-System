/**
 * Role-based Authorization Middleware
 * Restricts access to routes based on user roles
 * Must be used after authentication middleware
 */

/**
 * Creates middleware to check if user has required role
 * @param {...string} allowedRoles - Roles that are allowed to access the route
 * @returns {Function} Middleware function
 */
const role = (...allowedRoles) => {
  return (req, res, next) => {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'נדרשת הרשאה'
      });
    }

    // Check if user's role is allowed
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'אין הרשאה לגשת למשאב זה'
      });
    }

    next();
  };
};

module.exports = role; 