const fs = require('fs')
require('dotenv').config()

module.exports = appInfo => {
  const config = exports = {}

  // cors
  // config.cors = {
  //   origin: '*'
  // }

  // crypto
  config.encrypt = {
    key: 'abcdefghigklmnopqrstuvwxyz123456',
    iv: 'abcdefghigklmnop'
  }

  // jwt
  config.jwt = {
    secret: 'silence'
  }

  // cookie sign key
  config.keys = appInfo.name + '_0225'

  // logger
  // config.logger = {
  //   level: 'DEBUG',
  //   allowDebugAtProd: true
  // }

  // middleware
  config.middleware = [
    'error',
    'miss'
  ]

  // mysql
  // config.mysql = {
  //   client: {
  //     host: '10.10.10.111',
  //     port: '30970',
  //     user: 'root',
  //     password: 'qxp1234',
  //     database: 'organizations'
  //   },
  //   app: true,
  //   agent: false
  // }

  // security
  // config.security = {
  //   csrf: false
  // }

  // siteFile
  config.siteFile = {
    '/favicon.ico': fs.readFileSync(('favicon.png'))
  }

  // socket.io
  // config.io = {
  //   init: { wsEngine: 'ws' },
  //   // redis: {
  //   //   host: { redis server host },
  //   //   port: { redis server port },
  //   //   auth_pass: { redis server password },
  //   //   db: 0
  //   // },
  //   namespace: {
  //     '/': {
  //       connectionMiddleware: ['connection'],
  //       packetMiddleware: ['packet']
  //     },
  //     '/example': {
  //       connectionMiddleware: [],
  //       packetMiddleware: []
  //     }
  //   }
  // }

  // static
  // config.static = {
  //   prefix: '/public/',
  //   dir: path.join(appInfo.baseDir, 'app/public')
  // }

  // add your user config here
  const userConfig = {
    project: {
      name: 'PX'
    },
    test: process.env.TEST_KEY
  }

  return {
    ...config,
    ...userConfig
  }
}
