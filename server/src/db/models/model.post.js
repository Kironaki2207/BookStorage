const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  /** Create the schema */
  return sequelize.define('post', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    bookURL: {
      type: Sequelize.STRING, 
    },
    imageURL: {
      type: Sequelize.STRING,
    },
    likes: {
      type: Sequelize.INTEGER,
    },
    commentsCount: {
      type: Sequelize.INTEGER,
    },
    userid: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  })
}
