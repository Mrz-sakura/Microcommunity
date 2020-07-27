const isPro = require('../utils/env')
let MYSQL_CONF = {
  username: 'root',
  password: '123456',
  host: '127.0.0.1',
  port: 3306,
  dialect: 'mysql'
}
let REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1'
}

if (isPro) {
  MYSQL_CONF = {
    username: 'root',
    password: '123456',
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql'
  }
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF
}
