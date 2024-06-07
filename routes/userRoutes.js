const express = require('express')
 

const { logincontroller,registercontroller, authController, applyDoctorController, getAllNotificationController, deleteAllNotificationController, getAllDoctorsController, bookAppointmentController, bookingAvailabilityController, userAppointmentsController } = require('../controllers/userCtrl');
const authMiddleware = require('../middlewares/authMiddleware');


const router = express.Router();


// Routes 
// Login || Post
router.post('/login',logincontroller)

//register ||post
router.post('/register',registercontroller)

//Auth||post
router.post('/getUserData',authMiddleware,authController)

//applyDoctor
router.post('/applyDoctor',authMiddleware,applyDoctorController)
router.post('/get-all-notification',authMiddleware,getAllNotificationController)

router.post('/delete-all-notification',authMiddleware,deleteAllNotificationController)


//getAll doctors on home page
router.get('/getAllDoctors',authMiddleware,getAllDoctorsController)

//nook-appointment controller
router.post('/book-appointment',authMiddleware,bookAppointmentController)

router.post('/booking-availability',authMiddleware,bookingAvailabilityController)


router.get('/user-appointments',authMiddleware,userAppointmentsController)

module.exports= router;