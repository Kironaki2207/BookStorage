const postStructure = {
  type: 'object',
  properties: {
    id: {type: 'integer'},
    title: {type: 'string'},
    book: {type: 'string'},
    author: {type: 'string'},
    tags: {type: 'array', items: {type: 'string'}},
    commentsCount: {type: 'integer'},
    userId: {type: 'integer'},
  },
  required: ['id', 'title', 'book'],
}

const addPost = {
  responce: {
    200: {
      type: 'object',
      properties: {
        title: {type: 'string'},
        book: {type: 'string'},
        author: {type: 'string'},
        userId: {type: 'integer'},
        image: {type: 'string'},
      },
      required: ['title', 'book', 'userId', 'author'],
    },
  },
}

module.export = {postStructure, addPost}
