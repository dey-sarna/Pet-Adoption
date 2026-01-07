// backend/controllers/adoptionController.js
const Adoption = require("../models/Adoption");

// POST /api/adoptions  (user apply korbe)
exports.applyAdoption = async (req, res) => {
  const userId = req.user.id;

  // frontend theke petId or pet_id jeivabei ashuk
  const { petId, pet_id } = req.body;
  const finalPetId = petId || pet_id;

  if (!finalPetId) {
    return res.status(400).json({ message: "petId is required" });
  }

  try {
    await Adoption.apply(userId, finalPetId);
    res.json({ message: "Adoption request submitted" });
  } catch (err) {
    console.error("applyAdoption error:", err);
    res.status(500).json({ error: err.message });
  }
};

// GET /api/adoptions/my  (logged-in user er sob application)
exports.getMyApplications = async (req, res) => {
  try {
    const [apps] = await Adoption.getByUser(req.user.id);
    res.json(apps);
  } catch (err) {
    console.error("getMyApplications error:", err);
    res.status(500).json({ error: err.message });
  }
};

// GET /api/adoptions/all  (admin)
exports.getAllApplications = async (req, res) => {
  try {
    const [apps] = await Adoption.getAll();
    res.json(apps);
  } catch (err) {
    console.error("getAllApplications error:", err);
    res.status(500).json({ message: "Failed to load applications" });
  }
};

// PUT /api/adoptions/:id  (admin status change)
exports.updateStatus = async (req, res) => {
  const { status } = req.body;

  try {
    await Adoption.updateStatus(req.params.id, status);
    res.json({ message: "Status updated" });
  } catch (err) {
    console.error("updateStatus error:", err);
    res.status(500).json({ message: "Update failed" });
  }
};