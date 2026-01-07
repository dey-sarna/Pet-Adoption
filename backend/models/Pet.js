const db = require("../config/db");

const Pet = {
  getAll: () => {
    const sql = "SELECT * FROM pets";
    return db.execute(sql);
  },

  getById: (id) => {
    const sql = "SELECT * FROM pets WHERE id = ?";
    return db.execute(sql, [id]);
  },

  create: (pet) => {
    const sql = `
      INSERT INTO pets (name, type, breed, age, description, image_url)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    return db.execute(sql, [
      pet.name,
      pet.type,
      pet.breed,
      pet.age,
      pet.description,
      pet.image_url
    ]);
  }
};

module.exports = Pet;
