module.exports = () => {
  return async function error (ctx, next) {
    try {
      await next()
    } catch (err) {
      // console.log(err)
      const status = err.statusCode || err.status || 500
      ctx.status = status
      ctx.body = {
        code: -1,
        msg: err.message,
        data: err.data
      }
    }
  }
}
