const Controller = require('egg').Controller

class Chat extends Controller {
  async test () {
    const { ctx, service } = this
    // const message = ctx.args[0]
    // await ctx.socket.emit('res', `Hi! I've got your message: ${message}`)
    const result = await service.note.getList()
    // console.log(io.of('/').sockets)
    // console.log(ctx.socket)
    await ctx.socket.emit('res', result)
  }
}

module.exports = Chat
