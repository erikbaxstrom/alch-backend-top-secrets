const pool = require('../utils/pool');

class User {
  id;
  email;
  #passwordHash;
}

module.exports = User;
