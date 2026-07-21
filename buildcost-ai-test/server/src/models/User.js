const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phone: { type: String, default: '' },
    role: { type: String, enum: ['Individual Builder', 'Architect / Engineer', 'General Contractor', 'Real Estate Developer'], default: 'Individual Builder' },
    avatar: { type: String, default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80' },
    subscription: { type: String, enum: ['Free Tier', 'Pro Builder', 'Enterprise'], default: 'Pro Builder' },
    currency: { type: String, default: 'USD' },
    unit: { type: String, default: 'sq.ft' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
