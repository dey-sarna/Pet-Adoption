// backend/controllers/userController.js
const User = require("../models/User");

exports.getMe = async (req, res) => {
  try {
    const userId = req.user.id; // authMiddleware theke
    const [rows] = await User.findById(userId);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0];
    res.json(user);
  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({ message: "Failed to load profile" });
  }
};

exports.updateMe = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    await User.updateProfile(userId, name, email);

    res.json({ message: "Profile updated", user: { id: userId, name, email } });
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ message: "Failed to update profile" });
  }
};