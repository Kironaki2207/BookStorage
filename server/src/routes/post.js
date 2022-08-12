const schema = require('../shemas/post')
const {FileService} = require('../services/file.service')
const {PostService} = require('../services/post.service')

module.exports = async function (fastify) {
  const postService = new PostService()
  const fileService = new FileService()

  fastify.route({
    method: 'POST',
    path: '/posts',
    //schema: schema.addPost,
    handler: async (request, reply) => {
      const data = await request.file()
      if (
        data.mimetype != 'application/pdf' &&
        data.mimetype != 'application/fb2' &&
        data.mimetype != 'application/epub'
      ) {
        reply.code(400)
      } else {
        console.log(data)
        let url = await fileService.CreateSile(data.fieldname, data.file)
        let post = postService.add(
          data.fields.title.value,
          url,
          data.fields.userId.value,
          data.fields.author.value
        )
        reply.send(post)
      }
    },
  })

  fastify.route({
    method: 'GET',
    path: '/posts/:postId',
    handler: async (request, reply) => {
      const {postId} = request.params
      const post = await postService.findById(postId)
      reply.send(post)
    },
  })

  fastify.route({
    method: 'GET',
    path: '/posts',
    handler: async (request, reply) => {
      let posts = await postService.findAll()
      reply.send(posts)
    },
  })

  fastify.route({
    method: 'DELETE',
    path: '/posts/:postId',
    handler: async (request, reply) => {
      const postId = request.params
      await postService.delete(postId)
    },
  })
}
