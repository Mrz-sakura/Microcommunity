const {SUCCESS_CODE, ERROR_CODE} = require('../config/code.conf')

class BaseResponse {
  constructor() {
    this.code = ''
    this.result = null
    this.msg = ''
  }
}

class SuccessJM extends BaseResponse {
  constructor(msg = '', result) {
    super();
    this.code = SUCCESS_CODE
    this.msg = msg
    this.result = result || null
  }
}

class ErrorJM extends BaseResponse {
  constructor(data = '', result) {
    super();
    if (typeof data === 'object') {
      this.code = data.code
      this.msg = data.msg
      this.result = null
    } else {
      this.code = ERROR_CODE
      this.msg = msg
      this.result = result || null
    }
  }
}

module.exports = {
  SuccessJM,
  ErrorJM
}
