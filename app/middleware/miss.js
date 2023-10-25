module.exports = () => {
  return async function miss (ctx, next) {
    await next()
    const status = ctx.status
    ctx.status = status
    if (ctx.status === 404) {
      ctx.body = {
        code: -1,
        msg: 'Not Found'
      }
    }
  }
}
