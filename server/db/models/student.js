const Sequelize = require('sequelize')
const db = require('../db')
const Student = db.define('students', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  //url to the recording
  recording: Sequelize.STRING,
  wasCalled: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Student
