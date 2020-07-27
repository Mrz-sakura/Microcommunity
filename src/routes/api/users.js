const router = require('koa-router')()
const jwt = require('jsonwebtoken'); // 用于签发、解析`token`
const md5 = require('md5-node');

const {PRIVITE_KEY, EXPIRESD} = require('../../config/key.conf')
const {User} = require('../../models')

const dataValidator = require("../../middlewares/validator")
const userValidate = require("../../schemas/user")
const {register} = require("../../services/user")
const RespJson = require('../../utils/response')
const resp = new RespJson()


// 注册
router.post('/register', dataValidator(userValidate), async (ctx, next) => {
  const data = ctx.request.body
  ctx.body = await register(data)
  console.log(ctx.body)

})

router.post('/login', async (ctx, next) => {
  const {email, password} = ctx.request.body
  if (!email || !password) {
    ctx.body = resp.error('请传入正确的参数!')
    return
  }
  const user = await User.findOne({
    where: {
      email,
      password: md5(`${password}_${PRIVITE_KEY}`)
    }
  })
  console.log(user)
  if (user) {
    const token = jwt.sign({id: user.id}, PRIVITE_KEY, {expiresIn: EXPIRESD})
    user.dataValues.token = token
    await User.update({
      token: token
    }, {
      where: {
        id: user.dataValues.id
      }
    })
    ctx.body = resp.success('登陆成功', user.dataValues)
    return
  }
  ctx.body = resp.error('登陆失败,请检查用户名或者密码')

})


router.get('/profile', async (ctx, next) => {
  let user = {}
  const token = ctx.cookies.get('token')
  if (token) {
    const result = jwt.verify(token, PRIVITE_KEY)
    if (result) {
      const id = result.id
      const userObj = await User.findOne({
        where: {id}
      })
      user = userObj.dataValues
    }

  }
  await ctx.render('profile', {
    user
  })
})

module.exports = router
