const getUser = {
  response: {
    200: {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            userId: {type: 'integer'},
            username: {type: 'string'},
            email: {type: 'string'},
            imageURL: {type: 'string'},
            bio: {type: 'string'},
            isAdmin: {type: 'boolean'},
          },
          required: ['userId', 'username', 'email'],
        },
      },
    },
  },
}

const addUser = {
  response: {
    200: {
      type: 'object',
      properties: {
        username: {type: 'string'},
        email: {type: 'string'},
        password: {type: 'string'},
      },
      required: ['username', 'email', 'password'],
    },
  },
}

module.exports = {getUser, addUser}
