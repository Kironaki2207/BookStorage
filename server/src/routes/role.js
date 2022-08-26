const schema = require('../shemas/user')
const {RoleService} = require('../services/role.service')

module.exports = async function (fastify) {
  const roleService = new RoleService()

  fastify.route({
    method: 'POST',
    path: '/admin/:userid',
    schema: schema.addUser,
    handler: async (request, reply) => {
      const userId = request.params
      const admin = await roleService.add(userId, 'ADMIN')
      reply.send(admin)
    },
  })

  fastify.route({
    method: 'DELETE',
    path: '/admin/:userid',
    schema: schema.addUser,
    handler: async (request, reply) => {
      const userId = request.params
      await roleService.delete(userId)
    },
  })
}
