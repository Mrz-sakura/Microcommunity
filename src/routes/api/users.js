const router = require('koa-router')()
const jwt = require('jsonwebtoken'); // 用于签发、解析`token`
const md5 = require('md5-node');

const {PRIVITE_KEY, EXPIRESD} = require('../../config/key.conf')
const {User} = require('../../models')

const dataValidator = require("../../middlewares/validator")
const userValidate = require("../../schemas/user")
const {register, login} = require("../../services/user")

const {SuccessJM, ErrorJM} = require('../../utils/response')
const checkLogin = require("../../middlewares/checkLogin")

// 注册
router.post('/register', dataValidator(userValidate), async (ctx, next) => {
  const data = ctx.request.body
  ctx.body = await register(data)

})

router.post('/login', dataValidator(userValidate), async (ctx, next) => {
  const data = ctx.request.body
  ctx.body = await login(data)
})


router.post('/profile', checkLogin, async (ctx, next) => {
  ctx.body = 'success'
})

module.exports = router
