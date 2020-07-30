/**
 * Created by Haoxin on 2020/7/27
 */
module.exports = {
  LOGIN_FAIL_INFO: {
    code: 1001,
    msg: '登陆失败,用户名或密码不正确'
  },
  VALIDATE_INFO: {
    code: 1007,
    msg: '数据验证失败,请检查数据格式'
  },
  REGISTER_EXIST_INFO: {
    code: 1004,
    msg: '注册失败,用户已存在'
  },
  REGISTER_FAIL_INFO: {
    code: 1005,
    msg: '注册失败,系统发生错误'
  },
  TOKEN_VERIFY_FAIL_INFO:{
    code: 1006,
    msg: '传入的token不符'
  }
}
