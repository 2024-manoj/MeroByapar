const User = require("../model/User");  // Make sure path is correct (model or models?)
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
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

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "cashier",
      store_id,
    });

    await user.save();
    console.log("User saved successfully");

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

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

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

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
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

// Forgot Password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const resetToken = jwt.sign(
      { user_id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Password reset link sent to email",
      resetToken,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findOne({ _id: decoded.user_id });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "✅ Password reset successfully" });
  } catch (error) {
    res.status(500).json({ error: "Invalid or expired token" });
  }
};

// Export all functions at the bottom (ONLY ONCE!)
module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword
};