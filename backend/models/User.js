
const db = require("../config/db");

const User = {
  create: (name, email, password, role = "user") => {
    const sql = `
      INSERT INTO users (name, email, password, role)
      VALUES (?, ?, ?, ?)
    `;
    return db.execute(sql, [name, email, password, role]);
  },

  findByEmail: (email) => {
    const sql = `SELECT * FROM users WHERE email = ?`;
    return db.execute(sql, [email]);
  },

  findById: (id) => {
    const sql = `SELECT * FROM users WHERE id = ?`;
    return db.execute(sql, [id]);
  },
};

module.exports = User;