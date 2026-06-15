
const Adoption = require("../models/Adoption");

exports.applyAdoption = async (req, res) => {
  const userId = req.user.id;

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


exports.getMyApplications = async (req, res) => {
  try {
    const [apps] = await Adoption.getByUser(req.user.id);
    res.json(apps);
  } catch (err) {
    console.error("getMyApplications error:", err);
    res.status(500).json({ error: err.message });
  }
};


exports.getAllApplications = async (req, res) => {
  try {
    const [apps] = await Adoption.getAll();
    res.json(apps);
  } catch (err) {
    console.error("getAllApplications error:", err);
    res.status(500).json({ message: "Failed to load applications" });
  }
};

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