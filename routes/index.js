var express = require('express');
var router = express.Router();
const courseController = require('../controllers/courseController.js');
const studentController = require('../controllers/studentController.js');
const userController = require('../controllers/userController.js');

function redirectGuests(req, res, next){
  if (!req.user){
    res.redirect('/login');
    return
  }
  next();
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/courses');
});

router.get('/courses', redirectGuests, courseController.viewAll);

router.get('/courses', courseController.viewAll);
router.get('/courses/profile/:id', courseController.viewProfile);
router.get('/courses/edit/:id', courseController.renderEditForm);
router.post('/courses/edit/:id', courseController.updateCourse);
router.get('/courses/add', courseController.renderAddForm);
router.post('/courses/add', courseController.addCourse);
router.get('/courses/delete/:id', courseController.deleteCourse);


router.get('/students', studentController.viewAll);
router.get('/students/profile/:id', studentController.viewProfile);
router.get('/students/edit/:id', studentController.renderEditForm);
router.post('/students/edit/:id', studentController.updateStudent);
router.get('/students/delete/:id', studentController.deleteStudent);

router.post('/students/:studentId/enroll/', studentController.enrollStudent);
router.get('/students/:studentId/removeCourse/:courseId', studentController.removeCourse);
router.post('/courses/:courseId/enroll', courseController.enrollStudent);
router.get('/courses/:courseId/removeStudent/:studentId', courseController.removeStudent);

router.get('/register-student', userController.renderStudentRegistrationForm);
router.post('/register-student', userController.registerStudent);
router.get('/register-staff', userController.renderStaffRegistrationForm);
router.post('/register-staff', userController.registerStaff);

router.get('/login', userController.renderLoginForm);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
module.exports = router;
