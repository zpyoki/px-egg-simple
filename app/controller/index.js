'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this
    ctx.body = `Hi, ${ctx.helper.now()}`
  }
}

module.exports = HomeController;
