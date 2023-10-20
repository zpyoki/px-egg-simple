'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this
    console.log(ctx.helper.now())
    ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
