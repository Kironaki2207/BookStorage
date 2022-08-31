const {CryptoService} = require('../services/crypto.service')
const jwt = require('jsonwebtoken')
const {UserService} = require('../services/user.service')
const {HttpBadRequest, HttpUnauthorized} = require('../errors')
const schema = require('../shemas/user')

module.exports = async function (fastify) {
  const userService = new UserService()
  const cryptoService = new CryptoService()

  fastify.route({
    method: 'POST',
    path: '/register',
    schema: schema.addUser,
    handler: async (request, reply) => {
      if (await userService.findBy('email', request.body.email)) {
        throw new HttpBadRequest('this email is already in use')
      }
      const hash_password = cryptoService.hash(request.body.password)
      const user = await userService.add(
        request.body.username,
        request.body.email,
        hash_password
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
        throw new HttpBadRequest('invalid email')
      }
      if (cryptoService.compare(request.body.password, user.password)) {
        const payload = {
          id: user.id,
          name: user.username,
          email: user.email,
        }
        const accesstoken = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: 3600 * 24,
        })
        const refreshtoken = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: 3600 * 24,
        })
        reply.send({
          accesstoken: `Access ${accesstoken}`,
          refreshtoken: `Refresh ${refreshtoken}`,
        })
      }
    },
  })

  fastify.route({
    method: 'POST',
    path: '/refresh',
    schema: schema.addUser,
    handler: async (request, reply) => {
      const {refreshtoken} = request.headers.Authorization
      jwt.verify(refreshtoken, process.env.JWT_SECRET, function (err) {
        if (err) {
          throw new HttpUnauthorized('Token is expired')
        } else {
          const payload = jwt.decode(refreshtoken).payload
          const accesstoken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 3600 * 24,
          })
          const refreshtoken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 3600 * 24,
          })
          reply.send({
            accesstoken: `Access ${accesstoken}`,
            refreshtoken: `Refresh ${refreshtoken}`,
          })
        }
      })
    },
  })
}
