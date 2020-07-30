const md5 = require('md5-node');
const {MD5_KEY, PRIVITE_KEY, EXPIRESD} = require('../config/key.conf')
const jwt = require('jsonwebtoken'); // 用于签发、解析`token`

/**
 * 密码 md5加密
 * @param password
 */
function md5_password(password) {
  return md5(password + MD5_KEY)
}

/**
 * 生成token
 * @param payload 加密的参数
 * @returns {string}
 */
function createToken(payload) {
  payload.rtiem = new Date();
  return jwt.sign(payload, PRIVITE_KEY, {expiresIn: EXPIRESD});
}

/**
 * 验证token
 * @param token 请求头里的token
 * @returns {Promise<string|object>}
 */
function checkToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, PRIVITE_KEY, (err, res) => {
      if (!err) {
        resolve(res)
      } else {
        reject("token验证失败");
      }
    })
  })
}

module.exports = {
  md5_password,
  createToken,
  checkToken
}
