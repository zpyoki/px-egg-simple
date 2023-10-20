const path = require('path')

module.exports = {
  cors: {
    enable: true,
    package: 'egg-cors'
  },
  io: {
    enable: true,
    package: 'egg-socket.io'
  },
  mysql: {
    enable: true,
    package: 'egg-mysql'
  },
  px: {
    enable: true,
    path: path.join(__dirname, '../lib/plugin/egg-px')
  },
  redis: {
    enable: true,
    package: 'egg-redis'
  },
  static: {
    enable: true,
    package: 'egg-static'
  },
  validate: {
    enable: true,
    package: 'egg-validate'
  }
}
