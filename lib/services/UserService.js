const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const users = require('../controllers/users.js');
const { User } = require('../models/User');

class UserService {
  static async create({ email, password }) {
    const passwordHash = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );

    const insertedUser = await User.insert({
      email,
      passwordHash,
    });
    return insertedUser;
  }
}

module.exports = UserService;
