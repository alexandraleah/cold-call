const router = require('express').Router()
const {Student, Course} = require('../db/models')

module.exports = router
//need to get all the courses for a user
//need to figure out how to get for the given user, and how to protect the route.
//also write tests for this, at least to test that you can't get the routes you are not supposed to
//and maybe use the session testing library to test that the user can get it as well
//test that only the user can create, read, update and delete courses.
router.get('/', async (req, res, next) => {
  try {
    const Courses = await Course.findAll({
      where: {
        //need to fix this
        userId: 'adsfasdf'
      }
    })
    res.json(Courses)
  } catch (error) {
    next(error)
  }
})
//post a new class
router.post('/', async (req, res, next) => {
  try {
    //I think you aren't supposed to do this with req.body but rather supposed to . off of it
    const newCourse = await Course.create(req.body)
    res.status(201).json(newCourse)
  } catch (error) {
    next(error)
  }
})

router.use('/:id', async (req, res, next) => {
  try {
    const course = await Course.find({
      where: {
        id: req.params.id
      }
    })
    if (!course) {
      const error = new Error(`There is no class with id of ${req.params.id}`)
      //also send an error if the user does not own the class
      error.status = 404
      return next(error)
    }
    req.course = course
    next()
  } catch (error) {
    next(error)
  }
})

//get a specific class
router.get('/:id', async (req, res, next) => {
  const course = await Course.findOne({
    where: {id: req.params.id},
    include: [{model: Student}]
  })
  res.json(course)
})

//update a class
router.put('/:id', async (req, res, next) => {
  try {
    //dot off of req.body instead of putting the whole thing in. How to do this efficiently?
    const updatedClass = await req.course.update(req.body)
    res.json(updatedClass)
  } catch (error) {
    next(error)
  }
})

//delete a class
//api/class/:id
router.delete('/:id', async (req, res, next) => {
  try {
    await req.course.destroy()
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
