const crypto = require('crypto')
const moment = require('moment')
const path = require('path')
const fs = require('fs')
const jsonwebtoken = require('jsonwebtoken')

module.exports = {
  test () {
    return moment().format('YYYYMMDDHHmmss')
  },
  md5 (data = 'yoki') {
    return crypto.createHash('md5').update(data, 'utf8').digest('hex')
  },
  now () {
    return new Date().getTime()
  },
  time () {
    return moment().format('YYYYMMDDHHmmss')
  },
  utd (value) {
    return moment().format(value || 'YYYY-MM-DD')
  },
  dtu (value) {
    return moment(value).valueOf()
  },
  decrypt (data) {
    const { config } = this
    const algorithm = 'aes-256-cbc'
    // const key = crypto.scryptSync(config.encrypt.key || '19910918', config.encrypt.salt || 'dinkstudio', 32)
    // const iv = crypto.scryptSync(config.encrypt.iv || '20200225', config.encrypt.salt || 'dinkstudio', 16)
    const key = config.encrypt.key
    const iv = config.encrypt.iv
    const cipher = crypto.createDecipheriv(algorithm, key, iv)
    let result = cipher.update(data, 'hex', 'utf8')
    result += cipher.final('utf8')
    return JSON.parse(result)
  },
  encrypt (data) {
    const { config } = this
    const algorithm = 'aes-256-cbc'
    // const key = crypto.scryptSync(config.encrypt.key || '19910918', config.encrypt.salt ||'dinkstudio', 32)
    // const iv = crypto.scryptSync(config.encrypt.iv || '20200225', config.encrypt.salt || 'dinkstudio', 16)
    const key = config.encrypt.key
    const iv = config.encrypt.iv
    const cipher = crypto.createCipheriv(algorithm, key, iv)
    let result = cipher.update(JSON.stringify(data), 'utf8', 'hex')
    result += cipher.final('hex')
    return result
  },
}