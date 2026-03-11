import bcrypt from "bcryptjs";
const jwt = require("jsonwebtoken");
const User = require("../model/User");
// register
const register = async (req, res) => {
  try {
    const { name, email, password, role, store_id } = req.body;
    const existingUser = await User.findOne({ email });
    console.log("existing user ko email", existingUser);

    if (existingUser) {
      return res.status(400).json({
        error: "yo email ta pailei xa arko banaunu holah",
      });
    }

    // database ma password plain text ma raknu risk hunxa so bcrypt use garney

    const hashedPasword = await bcrypt.hash(password, 10);

    //aaba user  create garum

    const user = new User({
      name,
      email,
      password: hashedPasword,
      role: role || "cashier",
      store_id,
    });

    await user.save();

    console.log("User save successfully");

    res.status(201).json({
      message: "user chai register vayo haii ta !!!",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// login

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(401).json({
        error: "gmail milena katei typing mistake vayo holah ",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        error: "password nai milena feri try hanum ta ",
      });
    }

    // suruma email kojiyo database bata check pani garo email milyo milena password milyo milena tyo pani hero
    // aaba token generate garum

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.status(200).json({
      message: "login chai safartapurbak vayo haii",
      token,
      user: {
        user_id: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const User = require('../models/User');
const bcrypt = require('bcryptjs');  // password hash गर्न
const jwt = require('jsonwebtoken');  // token बनाउन

// 1️⃣ REGISTER - नयाँ user बनाउने
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, store_id } = req.body;

    // ✅ Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // 🔒 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 👤 Create user
    const user = new User({
      user_id: `USR_${Date.now()}`,
      name,
      email,
      password: hashedPassword,
      role: role || 'cashier',
      store_id
    });

    await user.save();

    // 🎫 Generate token
    const token = jwt.sign(
      { user_id: user.user_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: '✅ User registered',
      token,
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2️⃣ LOGIN - पुरानो user लाई भित्र ल्याउने
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔍 Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // 🔐 Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // 🎫 Generate token
    const token = jwt.sign(
      { user_id: user.user_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: '✅ Login successful',
      token,
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3️⃣ GET PROFILE - आफ्नो जानकारी हेर्ने
exports.getProfile = async (req, res) => {
  try {
    // req.user auth middleware बाट आएको
    const user = await User.findOne({ user_id: req.user.user_id })
      .select('-password')
      .populate('store_id');
      
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4️⃣ CHANGE PASSWORD - पासवर्ड फेर्ने
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    // Find user
    const user = await User.findOne({ user_id: req.user.user_id });

    // Check old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Old password is incorrect' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: '✅ Password changed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 5️⃣ LOGOUT - बाहिर निस्कने
exports.logout = async (req, res) => {
  // JWT token client मा delete हुन्छ
  res.json({ message: '✅ Logged out successfully' });
};

// 6️⃣ FORGOT PASSWORD - पासवर्ड बिर्सेको बेला
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Reset token बनाउने (expires in 1 hour)
    const resetToken = jwt.sign(
      { user_id: user.user_id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // TODO: Send email with reset link
    // reset link: http://localhost:3000/reset-password?token=${resetToken}

    res.json({ 
      message: 'Password reset link sent to email',
      resetToken // Remove in production
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 7️⃣ RESET PASSWORD - नयाँ पासवर्ड सेट गर्ने
 const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findOne({ user_id: decoded.user_id });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: '✅ Password reset successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Invalid or expired token' });
  }
};




module.exports = {login,register, resetPassword,forgotPassword };