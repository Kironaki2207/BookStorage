const Sequelize = require('sequelize')
module.exports = function (sequelize) {
  /** Create the schema */
  // Cоздал два поля - ссылку на айди юзера и роль(если прийдется добавлять еще роли, чтобы была открытость к расширению).
  return sequelize.define('role', {
    userid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    role: {
      type: Sequelize.STRING,
    },
  })
}
