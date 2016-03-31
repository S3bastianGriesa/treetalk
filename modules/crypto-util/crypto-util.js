const crypto = require('crypto');

class CryptoUtil {
  createRandomSalt(size) {
    crypto.randomBytes(size).toString('hex');
  }

  createPasswordHash(password, salt) {
    const buffer = new Buffer(salt, 'hex');
    return crypto.pbkdf2Sync(password, buffer, 10000, 64, 'sha256').toString(
      'hex');
  }
}

module.exports = new CryptoUtil();
