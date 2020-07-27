const md5 = require('md5-node');
const {MD5_KEY} = require('../config/key.conf')

/**
 * 密码 md5加密
 * @param password
 */
function md5_password(password) {
  return md5(password + MD5_KEY)
}

module.exports = {
  md5_password
}
