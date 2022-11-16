const pool = require('../utils/pool');

class User {
  id;
  email;
  #passwordHash;
  constructor({ rows }) {
    console.log('consturctor::', { rows });
  }

  static async insert({ email, passwordHash }) {
    console.log('model::', email, passwordHash);
    const { rows } = await pool.query(
      `
    INSERT INTO users (email, password_hash)
    VALUES ($1, $2)
    RETURNING *
    `,
      [email, passwordHash]
    );
    return new User(rows[0]);
  }
}

module.exports = { User };
