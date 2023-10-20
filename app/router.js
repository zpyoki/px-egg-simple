module.exports = app => {
  const { router, controller, io, middleware } = app
  const jwt = middleware.jwt()

  // index
  router.get('/', controller.index.index)

  // example
  router.get('/example', jwt, controller.example.list)
  router.get('/example/:id', controller.example.read)
  router.post('/example', controller.example.create)
  router.put('/example/:id', controller.example.update)
  router.delete('/example/:id', controller.example.delete)

  // socket.io
  io.of('/').route('test', io.controller.chat.test)
}
