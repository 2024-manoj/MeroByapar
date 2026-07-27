/**
 * Role-based authorization middleware
 * Use after auth middleware to restrict routes by user role
 * 
 * Usage: router.get('/admin-only', auth, authorize('admin'), handler)
 *        router.get('/staff', auth, authorize('admin', 'manager'), handler)
 */

const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    // req.user is set by the auth middleware
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please login first.",
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. This route requires one of these roles: ${allowedRoles.join(", ")}`,
      });
    }

    next();
  };
};

module.exports = authorize;
