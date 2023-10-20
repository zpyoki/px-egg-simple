const Service = require('egg').Service

class Example extends Service {
  async getList () {
    const { app } = this
    const result = await app.mysql.query('select * from note')
    return result
  }

  async getDetail (data) {
    const { app } = this
    const result = await app.mysql.get('note', data)
    // 访问量修改
    if (result) {
      await app.mysql.update('note', { view: result.view + 1 }, { where: data })
    }
    return result
  }

  async create (data) {
    const { app } = this
    const conn = await app.mysql.beginTransaction()
    try {
      const result = await conn.insert('note', data)
      await conn.commit()
      return result
    } catch (err) {
      await conn.rollback()
      throw err
    }
  }

  async update (data) {
    const { app, ctx } = this
    const item = await app.mysql.get('note', data)
    if (item) {
      const conn = await app.mysql.beginTransaction()
      try {
        const result = await conn.update('note', data)
        await conn.commit()
        return result
      } catch (err) {
        await conn.rollback()
        throw err
      }
    } else {
      ctx.throw('资源不存在')
    }
  }

  async delete (data) {
    const { app, ctx } = this
    const item = await app.mysql.get('note', data)
    if (item) {
      const conn = await app.mysql.beginTransaction()
      try {
        const result = await conn.delete('note', data)
        await conn.commit()
        return result
      } catch (err) {
        await conn.rollback()
        throw err
      }
    } else {
      ctx.throw('资源不存在')
    }
  }
}

module.exports = Example
