import bcrypt from "bcryptjs";
const jwt = require("jsonwebtoken");
const User = require("../model/User");
import db from "../config/db.js";


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

// backend
export const registerUser = (req, res) => {

  const { name, email, password } = req.body;

  const sql =
    "INSERT INTO users (name,email,password) VALUES (?,?,?)";

  db.query(sql, [name, email, password], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    return res.json("User registered successfully");

  });

};
