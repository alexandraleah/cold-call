const User = require('./user')
const Course = require('./course')
const Student = require('./student')
Course.belongsTo(User)
User.hasMany(Course)
Student.belongsTo(Course)
Course.hasMany(Student)
//do the students have to be directly connected to a user? Or can they be connected through courses?
// Student.belongsTo(User)
// User.hasMany(Student)

module.exports = {
  User,
  Course,
  Student
}
