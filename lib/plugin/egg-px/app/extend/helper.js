const crypto = require('crypto')
const moment = require('moment')
const path = require('path')
const fs = require('fs')
const jsonwebtoken = require('jsonwebtoken')

module.exports = {
  test () {
    return moment().format('YYYYMMDDHHmmss')
  },
  success (res = {}) {
    this.ctx.body = {
      code: 0,
      msg: res === null || res.msg === undefined ? 'ok' : res.msg,
      data: res === null || res.msg === undefined ? res : (res.data === undefined ? {} : res.data)
    }
  },
  error (msg = 'error') {
    this.ctx.body = {
      code: -1,
      msg: msg
    }
  },
  random: {
    number (length = 4) {
      const result = []
      for (let i = 0; i < length; i++) {
        result.push(Math.floor(Math.random() * 10))
      }
      return result.join('')
    },
    string (length = 32) {
      let result = ''
      const range = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
      for (let i = 0; i < length; i++) {
        result += range[Math.floor(Math.random() * range.length)]
      }
      return result
    }
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
  jwt (data) {
    return jsonwebtoken.sign(data, this.config.jwt.secret)
  },
  jwtd (data) {
    return jsonwebtoken.verify(data, this.config.jwt.secret)
  },
  async get (url = '', data = {}, opts = {}) {
    opts = Object.assign({}, { method: 'GET', dataType: 'json', contentType: 'json' }, { data }, opts)
    const result = await this.ctx.curl(url, opts)
    return result.data
  },
  async post (url = '', data = {}, opts = {}) {
    opts = Object.assign({}, { method: 'POST', dataType: 'json', contentType: 'json' }, { data }, opts)
    const result = await this.ctx.curl(url, opts)
    return result.data
  },
}