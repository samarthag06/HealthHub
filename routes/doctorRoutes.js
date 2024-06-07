const express = require('express');
const { getDoctorInfoController, updateProfileController, getDoctorByIdController, doctorAppointmentsController, updateStatusController } = require('../controllers/doctorCtrl');
const authMiddleware = require('../middlewares/authMiddleware');
 

const router = express.Router();


//getting doctor info base on his user id 
router.post('/getDoctorInfo',authMiddleware,getDoctorInfoController)

//updating doctor profile
router.post('/updateProfile',authMiddleware, updateProfileController)

router.post('/getDoctorById',authMiddleware,getDoctorByIdController)



router.get('/get-appointments',authMiddleware, doctorAppointmentsController);


//approve and rejects appointment requests

router.post('/update-status',authMiddleware,updateStatusController)
module.exports= router;
