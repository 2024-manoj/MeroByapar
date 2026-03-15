/*
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

dotenv.config();


const app = express();



mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/inv_system' )
.then(()=> {
    console.log("mongodb chai connect vayo haita");
}

)

.catch((err)=>{
    console.log("Database chai connect vayena", err)
})


app.get('/', (req, res)=>{

    res.json({
        message: 'SERVER CHAI CHALNA THALYO HAITA '
    })
}) 





const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server running on the port ${PORT}`)
})
*/
import express from "express";
import cors from "cors";
import db from "./db.js";
import bcrypt from "bcryptjs";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// REGISTER route
app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields required" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  
  db.query(sql, [name, email, hashedPassword], (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ message: "Email already exists" });
      }
      return res.status(500).json({ message: "Server error" });
    }
    res.json({ message: "User registered successfully" });
  });
});

// LOGIN route
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "All fields required" });

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: "Server error" });
    if (results.length === 0) return res.status(400).json({ message: "User not found" });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.json({ message: "Login successful" });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});