/**
 * Created by Haoxin on 2020/7/27
 */
const {User} = require('../models')
const {md5_password} = require('../utils')
const {DEFAULT_AVATAR} = require('../config')
const RespJson = require('../utils/response')
const resp = new RespJson()
const {REGISTER_EXIST_INFO, REGISTER_FAIL_INFO} = require('../config/error.conf')

/**
 * 获取用户信息
 * @param email 用户邮箱
 * @param password 密码
 * @returns {Promise<boolean|*>}
 */
async function getUserInfo(email, password) {
  const options = {email}
  if (!email) return false;
  if (password) Object.assign(options, {password})
  const findResult = await User.findOne({
    where: options,
    attributes: ['id', 'email', 'gender', 'username', 'nickname', 'createdAt']
  })
  if (findResult) {
    return findResult.dataValues
  }
  return null;
}

async function register(data) {
  const findResult = await getUserInfo(data.email)
  if (findResult) {
    return resp.error(REGISTER_EXIST_INFO)
  }
  try {
    await createUser(data)
    return resp.success('注册成功')
  } catch (e) {
    console.log(e)
    return resp.error(REGISTER_FAIL_INFO)
  }
}

/**
 * 创建用户信息
 * @param email 邮箱
 * @param nickname 昵称
 * @param password 密码
 * @param gender 性别
 * @param avatar 头像,没有就设置默认
 * @returns {Promise<{msg: string, result: {}, code: number}>}
 */
async function createUser({email, nickname = '', password, gender = 'u', avatar = DEFAULT_AVATAR}) {
  const user = await User.create({
    email,
    nickname,
    username: 'blog_id' + Math.floor((Math.random() * 9999) + 1) + nickname + new Date().getTime(),
    password: md5_password(password),
    gender,
    avatar
  })
  return user.dataValues
}

module.exports = {
  getUserInfo,
  createUser,
  register
}
