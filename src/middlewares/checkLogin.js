/**
 * Created by Haoxin on 2020/7/30
 */
const {checkToken} = require('../utils')
const {PRIVITE_KEY, EXPIRESD} = require('../config/key.conf')
const {TOKEN_VERIFY_FAIL_INFO, REGISTER_FAIL_INFO} = require('../config/error.conf')
const {SuccessJM, ErrorJM} = require('../utils/response')
const {getUserInfo} = require("../services/user")
const Store = require('../utils/store')
const store = new Store()

module.exports = async (ctx, next) => {
  console.log(ctx.header)
  // 获取jwt
  const token = ctx.header.authorization;
  if (token && await store.get(token)) {
    await next()
  } else {
    ctx.body = new ErrorJM(TOKEN_VERIFY_FAIL_INFO)
  }
}
