const Pet = require("../models/Pet");

// GET all pets
exports.getAllPets = async (req, res) => {
  try {
    const [pets] = await Pet.getAll();
    return res.status(200).json(pets);
  } catch (err) {
    console.error("Get All Pets Error:", err);
    return res.status(500).json({ message: "Failed to fetch pets" });
  }
};

// GET single pet by ID
exports.getPetById = async (req, res) => {
  try {
    const [result] = await Pet.getById(req.params.id);

    // Pet not found
    if (result.length === 0) {
      return res.status(404).json({ message: "Pet not found" });
    }

    return res.status(200).json(result[0]);
  } catch (err) {
    console.error("Get Pet By ID Error:", err);
    return res.status(500).json({ message: "Failed to fetch pet" });
  }
};
