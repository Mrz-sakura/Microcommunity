const router = require('koa-router')()
const jwt = require('jsonwebtoken'); // 用于签发、解析`token`
const md5 = require('md5-node');

const {PRIVITE_KEY, EXPIRESD} = require('../config/key.conf')
const {User} = require('../models')
const {validateData} = require("../utils/index")
const RespJson = require('../utils/response')

const resp = new RespJson()

router.get('/', async (ctx, next) => {
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
    await ctx.render('index', {
        user
    })
})



// 注册
router.post('/register', async (ctx, next) => {
    const validateMap = [
        {key: 'username', msg: '请输入用户名'},
        {key: 'password', msg: '请输入密码'},
        {key: 'email', msg: '请输入正确的邮箱', reg: 'email'}
    ]

    if (validateData(ctx.request.body, validateMap)) {
        console.log(validateData(ctx.request.body, validateMap))
        ctx.body = resp.error(validateData(ctx.request.body, validateMap))
        return
    }

    const {email, password, username} = ctx.request.body

    const findUser = await User.findOne({
        where: {
            email
        }
    })
    if (findUser) {
        ctx.body = resp.error('该用户已被注册')
        return
    }
    const user = await User.create({
        email,
        username,
        password: md5(`${password}_${PRIVITE_KEY}`),
    })
    ctx.body = resp.success('注册成功~')
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
