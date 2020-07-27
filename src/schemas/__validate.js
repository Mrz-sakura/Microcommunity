/**
 * Created by Haoxin on 2020/7/27
 */
const Ajv = require('ajv')
const ajv = new Ajv({
  allErrors: false // 不输出所有的错误
})

/**
 * schema 格式校验
 * @param {Object} schema json schema
 * @param {Object} data 校验的值
 */
function __validate(schema, data = {}) {
  const valid = ajv.validate(schema, data);
  if (!valid) return ajv.errors[0];
}

module.exports = __validate
