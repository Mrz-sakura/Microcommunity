const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors');
const jwtKoa = require('koa-jwt'); // 用于路由权限控制

const {PRIVITE_KEY} = require('./config/key.conf')

const indexRoute = require("./routes/index")
const userViewRoute = require('./routes/view/users')
const userApiRoute = require('./routes/api/users')

const error = require('./routes/error')
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
// 允许跨域
app.use(cors());
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
  // extension: 'ejs'
}))
app.use(jwtKoa({secret: PRIVITE_KEY}).unless({
  // 设置login、register接口，可以不需要认证访问
  path: [
    /^\/login/,
    /^\/register/,
    /^((?!\/user).)*$/ // 设置除了私有接口外的其它资源，可以不需要认证访问
  ]
}));

// routes

app.use(indexRoute.routes(), indexRoute.allowedMethods())
app.use(userViewRoute.routes(), userViewRoute.allowedMethods())
app.use(userApiRoute.routes(), userApiRoute.allowedMethods())

app.use(error.routes(), error.allowedMethods())

// app.use('*')

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
