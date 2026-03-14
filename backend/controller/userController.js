const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1️⃣ REGISTER USER
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role, store_id, createdBy } = req.body;

    // Check email uniqueness
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ success: false, message: "Email already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'cashier',
      store_id,
      createdBy
    });

    await user.save();

    res.status(201).json({ success: true, message: "User registered successfully", data: user });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 2️⃣ LOGIN USER
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Incorrect password" });

    // JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role, store_id: user.store_id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({ success: true, token, data: user });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 3️⃣ GET ALL USERS
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .populate('store_id', 'store_name')
      .populate('createdBy', 'name')
      .sort('-createdAt');

    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 4️⃣ GET USER BY ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('store_id', 'store_name')
      .populate('createdBy', 'name');

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 5️⃣ UPDATE USER
exports.updateUser = async (req, res) => {
  try {
    const { name, email, password, role, store_id, isActive } = req.body;

    let user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;
    user.store_id = store_id || user.store_id;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    if (isActive !== undefined) user.isActive = isActive;

    await user.save();

    res.status(200).json({ success: true, message: "User updated successfully", data: user });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 6️⃣ DELETE USER
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: "User deleted successfully" });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};