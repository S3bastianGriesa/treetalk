const crypto = require('crypto');

class CryptoUtil {
  createRandomSalt(size) {
    crypto.randomBytes(size).toString('hex');
  }

  createPasswordHash(password, salt, iterations) {
    return crypto.pbkdf2Sync(password, salt, iterations, 64).toString('hex');
  }
}

module.exports = new CryptoUtil;
