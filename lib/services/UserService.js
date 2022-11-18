const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

  static async signIn({ email, password }) {
    try {
      const user = await User.getByEmail(email);
      if (!user) throw new Error('Invalid email');
      if (!bcrypt.compareSync(password, user.passwordHash))
        throw new Error('Invalid password');

      const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
        expiresIn: '1 day',
      });
      console.log('UserService token::', token);
      return token;
    } catch (error) {
      error.status = 401;
      throw error;
    }
  }
}

module.exports = UserService;
