const db = require("../config/db");

const Adoption = {
  apply: (userId, petId) => {
    const sql = `
      INSERT INTO adoptions (user_id, pet_id)
      VALUES (?, ?)
    `;
    return db.execute(sql, [userId, petId]);
  },

  getByUser: (userId) => {
    const sql = `
      SELECT a.id,
             a.status,
             a.applied_at,
             p.id   AS pet_id,
             p.name AS pet_name,
             p.image_url
      FROM adoptions a
      JOIN pets p ON a.pet_id = p.id
      WHERE a.user_id = ?
      ORDER BY a.applied_at DESC
    `;
    return db.execute(sql, [userId]);
  },

  // admin
  getAll: () => {
    const sql = `
      SELECT a.id,
             a.status,
             a.applied_at,
             u.name AS user_name,
             u.email AS user_email,
             p.name AS pet_name
      FROM adoptions a
      JOIN users u ON a.user_id = u.id
      JOIN pets p ON a.pet_id = p.id
      ORDER BY a.applied_at DESC
    `;
    return db.execute(sql);
  },

  updateStatus: (id, status) => {
    const sql = "UPDATE adoptions SET status = ? WHERE id = ?";
    return db.execute(sql, [status, id]);
  },
};

module.exports = Adoption;