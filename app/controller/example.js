const Controller = require('egg').Controller

class Example extends Controller {
  async list () {
    const { ctx, service, app } = this
    const redis = await app.redis.get('exampleList')
    if (redis !== null) {
      return ctx.helper.success(JSON.parse(redis))
    }
    const result = await service.example.getList()
    if (result && result.length) {
      await app.redis.set('exampleList', JSON.stringify(result), 'ex', 10)
      ctx.helper.success(result)
    } else {
      ctx.helper.error('未查询到数据')
    }
  }

  async read () {
    const { ctx, service } = this
    const result = await service.example.getDetail(ctx.params)
    if (result) {
      ctx.helper.success(result)
    } else {
      ctx.helper.error('未查询到数据')
    }
  }

  async create () {
    const { ctx, service } = this
    const rule = {
      title: { type: 'string' },
      detail: { type: 'object' }
    }
    ctx.validate(rule, ctx.request.body)
    const data = ctx.request.body
    data.ctime = ctx.helper.now()
    const result = await service.example.create(data)
    if (result && result.affectedRows === 1) {
      ctx.helper.success()
    } else {
      ctx.helper.error('创建失败')
    }
  }

  async update () {
    const { ctx, service } = this
    const rule = {
      id: { type: 'string' }
    }
    ctx.validate(rule, ctx.params)
    const rule2 = {
      title: { type: 'string' },
      detail: { type: 'object' }
    }
    ctx.validate(rule2, ctx.request.body)
    const data = ctx.request.body
    data.etime = ctx.helper.now()
    const result = await service.example.update(data)
    if (result && result.affectedRows === 1) {
      ctx.helper.success()
    } else {
      ctx.helper.error('修改失败')
    }
  }

  async delete () {
    const { ctx, service } = this
    const rule = {
      id: { type: 'string' }
    }
    ctx.validate(rule, ctx.params)
    const result = await service.note.delete(ctx.params)
    if (result && result.affectedRows === 1) {
      ctx.helper.success()
    } else {
      ctx.helper.error('删除失败')
    }
  }
}

module.exports = Example
