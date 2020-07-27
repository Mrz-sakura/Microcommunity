const router = require('koa-router')()

// router.prefix('/users')

router.get('/register', async (ctx, next) => {
    await ctx.render('register')
})

router.get('/login', async (ctx, next) => {
    await ctx.render('login')
})

module.exports = router
