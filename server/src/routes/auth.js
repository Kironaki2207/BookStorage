const crypto = require('crypto')
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
      //const salt = await bcrypt.genSalt(10)
      //const hash = await bcrypt.hash(request.body.password, salt)

      const salt = crypto.randomBytes(128).toString('base64') // length = 172
      const hash = crypto
        .createHash('sha512')
        .update(request.body.password)
        .digest('hex')

      const user = await userService.add(
        request.body.username,
        request.body.email,
        hash + salt
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
      let password = user.password.slice(0, -172)
      const hash = crypto
        .createHash('sha512')
        .update(request.body.password)
        .digest('hex')
      //const isMatch = await bcrypt.compare(request.body.password, user.password)
      if (hash == password) {
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
