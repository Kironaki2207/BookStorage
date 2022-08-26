const schema = require('../shemas/user')
const {UserService} = require('../services/user.service')
const {FileService} = require('../services/file.service')

module.exports = async function (fastify) {
  const userService = new UserService()
  const fileService = new FileService()

  fastify.route({
    method: 'POST',
    path: '/users',
    schema: schema.addUser,
    handler: async (request, reply) => {
      const user = await userService.add(
        request.body.username,
        request.body.email,
        request.body.password
      )
      reply.send(user)
    },
  })

  fastify.route({
    method: 'GET',
    path: '/users/:userId',
    handler: async (request, reply) => {
      const {userId} = request.params
      const user = await userService.findById(userId)
      reply.send(user)
    },
  })

  fastify.route({
    method: 'PATCH',
    path: '/users/avatar/:userId',
    schema: schema.addAvatar,
    handler: async (request, reply) => {
      const data = await request.file()
      const {userId} = request.params
      url = await fileService.CreateFile(data.fieldname, data.file)
      const user = await userService.edit(userId, url, data.fieldname)
      reply.send(user)
    },
  })

  fastify.route({
    method: 'GET',
    path: '/users/name',
    schema: schema.getUser,
    handler: async (request, reply) => {
      const {username} = request.query
      const user = await userService.findByUsername(username)
      reply.send({user})
    },
  })

  fastify.route({
    method: 'DELETE',
    path: '/users/:userId',
    handler: async (request, reply) => {
      const userId = request.params
      await userService.delete(userId)
    },
  })
}
