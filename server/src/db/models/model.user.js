const Sequelize = require('sequelize')
module.exports = function (sequelize) {
  /** Create the schema */
  return sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
    },
    imageURL: {
      type: Sequelize.STRING,
    },
    bio: {
      type: Sequelize.STRING,
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
    },
    password: {
      type: Sequelize.STRING,
    },
  })
}
