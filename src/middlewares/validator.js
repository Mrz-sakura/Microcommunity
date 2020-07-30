/**
 * Created by Haoxin on 2020/7/27
 */
const {ErrorJM} = require('../utils/response')
const {VALIDATE_INFO} = require("../config/error.conf")

/**
 *
 * @param {Function} validateCallback 传入的验证函数
 */
function dataValidator(validateCallback) {
  async function validate(ctx, next) {
    const error = validateCallback(ctx.request.body)
    if (error) {
      ctx.body = new ErrorJM(VALIDATE_INFO)
      return
    }
    await next()
  }

  return validate
}

module.exports = dataValidator
