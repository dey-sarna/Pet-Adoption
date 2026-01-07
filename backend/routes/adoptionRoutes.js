
const express = require("express");
const router = express.Router();

const adoptionController = require("../controllers/adoptionController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// USER ROUTES
router.post("/", authMiddleware, adoptionController.applyAdoption);
router.get("/my", authMiddleware, adoptionController.getMyApplications);

// ADMIN ROUTES
router.get(
  "/all",
  authMiddleware,
  adminMiddleware,
  adoptionController.getAllApplications
);
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  adoptionController.updateStatus
);

module.exports = router;