const crypto = require('crypto');

class CryptoUtil {
  createRandomSalt(size) {
    crypto.randomBytes(size).toString('hex');
  }

  createPasswordHash(password, salt) {
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('hex');
  }
}

module.exports = new CryptoUtil();
