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

const addAvatar = {
  response: {
    200: {
      type: 'object',
      properties: {
        avatar: {type: 'string'},
      },
      required: ['avatar'],
    },
  },
}

module.exports = {getUser, addUser, addAvatar}
