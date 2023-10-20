const Subscription = require('egg').Subscription

class Test extends Subscription {
  static get schedule () {
    return {
      interval: '1m',
      type: 'all'
    }
  }

  async subscribe () {
    const { ctx } = this
    const res = 123
    ctx.body = res
  }
}

module.exports = Test
