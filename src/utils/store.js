/**
 * Created by Haoxin on 2020/7/30
 */
const Redis = require('ioredis');
const redis = new Redis();

class Store {

  constructor(key, options) {
    this.redis = redis;
    this.key = key || 'TOKEN-';
    this.options = {
      timeout: 1000 * 60 * 60 * 24 * 7,   // 7 天
      ...options,
    }
  }

  // 获取 token
  async get (tk) {
    try {
      let val = JSON.parse(await this.redis.get(this.key + tk));
      if (val == null) return null;
      if (Date.now() - val.time > this.options.timeout) {
        await this.destroy(tk);
        return null;
      }
      return val;
    } catch (err) {
      console.error('Token Store:get Error'.red, err);
    }
  }

  // 设置 token
  async set (tk, val) {
    try {
      val = Object.assign(val, { time: Date.now() })
      return await this.redis.set(this.key + tk, JSON.stringify(val));
    } catch (err) {
      console.error('Token Store:set Error'.red, err);
    }
  }

  // 销毁 token
  async destroy (tk) {
    try {
      return await this.redis.del(this.key + tk);
    } catch (err) {
      console.error('Token Store:destroy Error'.red, err);
    }
  }
}

module.exports = Store;
