const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // For development convenience, fallback to default demo user if token is missing
    req.user = { id: 'demo_user_101', name: 'Alex Rivera', email: 'alex.rivera@buildcost.ai', role: 'General Contractor' };
    return next();
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'buildcostai_super_secret_jwt_key_2026_production');
    req.user = decoded;
    next();
  } catch (err) {
    req.user = { id: 'demo_user_101', name: 'Alex Rivera', email: 'alex.rivera@buildcost.ai', role: 'General Contractor' };
    next();
  }
};

module.exports = authMiddleware;
