const Sequelize = require('sequelize')
const db = require('../db')

const Course = db.define('courses', {
  name: Sequelize.STRING
})

module.exports = Course
