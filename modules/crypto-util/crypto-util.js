const crypto = require('crypto');

class CryptoUtil {
  createRandomSalt(size) {
    return crypto.randomBytes(size).toString('base64');
  }

  createPasswordHash(password, salt) {
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }
}

module.exports = new CryptoUtil();
