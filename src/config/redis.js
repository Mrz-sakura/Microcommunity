const redis = require('redis')
const {REDIS_CONF} = require("./db.conf")

const client = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

client.on('ready', function (res) {
  console.log('ready');
});

client.on('end', function (err) {
  console.log('end');
});

client.on('error', function (err) {
  console.log(err);
});

client.on('connect', function () {
  console.log('redis connect success!');
});

module.exports = client
