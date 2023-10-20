module.exports = app => {
  return async (ctx, next) => {
    console.log('connection')
    // if (true) {
    //   ctx.socket.disconnect()
    //   return
    // }
    await next()
    console.log('disconnection')
  }
}
