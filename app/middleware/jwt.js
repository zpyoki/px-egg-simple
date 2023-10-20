const jwt = require('jsonwebtoken')

module.exports = options => {
  return async function (ctx, next) {
    const token = ctx.request.header.authorization
    if (!token) {
      if (ctx.path === '/api/v1/register' || ctx.path === '/api/v1/login/account') {
        await next()
      } else {
        // ctx.throw('未登录，请先登录')
        ctx.status = 422
        ctx.body = { msg: '未登录，请先登录' }
      }
    } else {
      try {
        const decode = jwt.verify(token, ctx.app.config.jwt.secret)
        // console.log(decode)
        if (!decode) {
          // ctx.throw('没有权限，请登录')
          ctx.status = 422
          ctx.body = { msg: '没有权限，请登录' }
        } else if (Date.now() - decode.expire > 0) {
          // ctx.throw('token已过期')
          ctx.status = 422
          ctx.body = { msg: 'token已过期' }
        } else {
          await next()
        }
      } catch (err) {
        // throw err
        console.log(err)
        // ctx.status = 422
        // ctx.body = { msg: '没有权限2，请登录' }
        const status = err.statusCode || err.status || 500
        ctx.status = status
        ctx.body = {
          msg: err.message,
          data: err.data
        }
      }
    }
  }
}
