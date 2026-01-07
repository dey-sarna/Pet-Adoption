// backend/routes/userRoutes.js
const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

// current logged-in user er info
router.get("/me", authMiddleware, userController.getMe);

// update current user
router.put("/me", authMiddleware, userController.updateMe);

module.exports = router;