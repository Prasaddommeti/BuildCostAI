const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { getIsConnected } = require('../config/db');

// In-memory mock store fallback
const memoryUsers = [
  {
    _id: 'demo_user_101',
    name: 'Alex Rivera',
    email: 'alex@buildcost.ai',
    passwordHash: '$2a$10$wT0E8...mock',
    phone: '+1 (555) 382-9102',
    role: 'General Contractor',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    subscription: 'Pro Builder',
    currency: 'USD',
    unit: 'sq.ft'
  }
];

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id || user.id, email: user.email, name: user.name, role: user.role },
    process.env.JWT_SECRET || 'buildcostai_super_secret_jwt_key_2026_production',
    { expiresIn: '30d' }
  );
};

const register = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }

    if (getIsConnected()) {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: 'User already exists with this email' });

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        phone: phone || '',
        role: role || 'Individual Builder'
      });

      const token = generateToken(newUser);
      return res.status(201).json({
        token,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          role: newUser.role,
          subscription: newUser.subscription,
          avatar: newUser.avatar,
          currency: newUser.currency,
          unit: newUser.unit
        }
      });
    } else {
      // In-Memory Fallback
      const existing = memoryUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (existing) return res.status(400).json({ message: 'User already exists with this email' });

      const newUser = {
        _id: 'user_' + Date.now(),
        name,
        email,
        phone: phone || '',
        role: role || 'Individual Builder',
        subscription: 'Pro Builder',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
        currency: 'USD',
        unit: 'sq.ft'
      };
      memoryUsers.push(newUser);
      const token = generateToken(newUser);
      return res.status(201).json({ token, user: newUser });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    if (getIsConnected()) {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: 'Invalid credentials' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

      const token = generateToken(user);
      return res.json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          subscription: user.subscription,
          avatar: user.avatar,
          currency: user.currency,
          unit: user.unit
        }
      });
    } else {
      // In-Memory Fallback
      const user = memoryUsers.find(u => u.email.toLowerCase() === email.toLowerCase()) || memoryUsers[0];
      const token = generateToken(user);
      return res.json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone || '+1 (555) 382-9102',
          role: user.role,
          subscription: user.subscription,
          avatar: user.avatar,
          currency: user.currency,
          unit: user.unit
        }
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProfile = async (req, res) => {
  try {
    if (getIsConnected()) {
      const user = await User.findById(req.user.id).select('-password');
      if (!user) return res.status(404).json({ message: 'User not found' });
      return res.json({ user });
    } else {
      const user = memoryUsers.find(u => u._id === req.user.id) || memoryUsers[0];
      return res.json({ user });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, phone, role, currency, unit } = req.body;
    if (getIsConnected()) {
      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        { name, phone, role, currency, unit },
        { new: true }
      ).select('-password');
      return res.json({ user: updatedUser });
    } else {
      const user = memoryUsers.find(u => u._id === req.user.id) || memoryUsers[0];
      if (name) user.name = name;
      if (phone) user.phone = phone;
      if (role) user.role = role;
      if (currency) user.currency = currency;
      if (unit) user.unit = unit;
      return res.json({ user });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { register, login, getProfile, updateProfile };
