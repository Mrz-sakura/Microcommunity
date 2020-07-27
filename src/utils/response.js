const respCode = require('../config/code.conf')

class ResponseJson {
  constructor(msg = '', result = {}) {
    this.ret = {
      code: respCode.SUCCESS_CODE,
      msg,
      result
    }
  }

  success(msg = '', result = {}) {
    this.ret = {
      code: respCode.SUCCESS_CODE,
      msg,
      result
    }
    return this.ret
  }

  error(msg = '', result = {}) {
    if (msg instanceof Object) {
      this.ret = {
        code: msg.code,
        msg: msg.msg,
        result
      }
    } else {
      this.ret = {
        code: respCode.ERROR_CODE,
        msg,
        result
      }
    }
    return this.ret
  }
}

module.exports = ResponseJson
