const express = require("express");
const router = express.Router();

const adoptionController = require("../controllers/adoptionController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");


router.post("/", authMiddleware, adoptionController.applyAdoption);
router.get("/my", authMiddleware, adoptionController.getMyApplications);


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