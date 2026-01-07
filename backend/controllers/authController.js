
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key";


exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    
    const [rows] = await User.findByEmail(email);
    if (rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const userRole = role || "user";

    const [result] = await User.create(name, email, hashed, userRole);

    const newUser = {
      id: result.insertId,
      name,
      email,
      role: userRole,
    };

    const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({ token, user: newUser });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Registration failed" });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await User.findByEmail(email);
    if (rows.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid email or password" });
    }

    const user = rows[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res
        .status(400)
        .json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed" });
  }
};


exports.getProfile = async (req, res) => {
  try {
    const [rows] = await User.findById(req.user.id);
    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0];
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
    });
  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({ message: "Failed to load profile" });
  }
};


exports.updateProfile = async (req, res) => {
  const { name, email } = req.body;

  try {
    await User.updateProfile(req.user.id, name, email);
    res.json({ message: "Profile updated" });
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ message: "Profile update failed" });
  }
};