/**
 * Created by Haoxin on 2020/7/27
 */
const validate = require('./__validate')

const schema = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email'
    },
    username: {
      type: 'string',
      maxLength: 255,
      minLength: 2
    },
    password: {
      type: 'string',
      maxLength: 255,
      minLength: 6
    },
    gender: {
      enum: ['f', 'm', 'u'],
      default: 'u'
    }
  }
}

function userValidate(data = {}) {
  return validate(schema, data);
}

module.exports = userValidate
