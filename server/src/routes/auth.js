const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {UserService} = require('../services/user.service')
const schema = require('../shemas/user')

module.exports = async function (fastify) {
  const userService = new UserService()

  fastify.route({
    method: 'POST',
    path: '/register',
    schema: schema.addUser,
    handler: async (request, reply) => {
      if (await userService.findBy('email', request.body.email)) {
        throw {statusCode: 201, message: 'incorrect email'}
      }

      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(request.body.password, salt)
      const user = await userService.add(
        request.body.username,
        request.body.email,
        hash
      )
      reply.send(user)
    },
  })

  fastify.route({
    method: 'POST',
    path: '/login',
    handler: async (request, reply) => {
      let user = await userService.findBy('email', request.body.email)
      if (!user) {
        throw {statusCode: 201, message: 'incorrect email'}
      }
      const isMatch = await bcrypt.compare(request.body.password, user.password)
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.username,
          email: user.email,
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: 3600 * 24,
        })
        reply.send({token: `Bearer ${token}`})
      }
    },
  })
}
