const {Sequelize} = require('sequelize')
let user = require('./db/models/model.user.js')
let post = require('./db/models/model.post.js')
let role = require('./db/models/model.role.js')
require('dotenv').config()

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_USER_PASSWORD,
  {
    host: 'localhost',
    dialect: process.env.SEQUELIZE_DIALECT,
  }
)

let dbUser = user(sequelize)
let dbPost = post(sequelize)
let dbRole = role(sequelize)

sequelize.sync().catch(function (err) {
  console.log(err)
  procces.exit(1)
})

module.exports = {user: dbUser, post: dbPost, role: dbRole}
