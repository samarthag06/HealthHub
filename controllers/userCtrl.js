const moment = require('moment')
const userModel = require('../models/userModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const doctorModel = require('../models/doctorModel')
const appointmentModel = require('../models/appointmentModel')
const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');

dayjs.extend(customParseFormat);


const registercontroller = async (req, res) => {



    try {

        const existinguser = await userModel.findOne({ email: req.body.email });

        if (existinguser) {

            return res.status(200).send({ message: 'User Already Exist', success: false })

        }


        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashed_password = await bcrypt.hash(password, salt);
        req.body.password = hashed_password;
        const newuser = new userModel(req.body);
        await newuser.save();

        res.status(201).send({ message: "Registered Successfully", success: true })







    } catch (error) {

        console.log(error)

        res.status(500).send({ message: `register controller ${error.message}`, success: false })


    }





}




const logincontroller = async (req, res) => {

    try {

        const user = await userModel.findOne({ email: req.body.email });
        // console.log(req.body.email)

        if (!user) {
            return res.status(200).send({ message: `User Not Found`, success: false });    // if email id dont match user dont exist and if matches we need to check the password
        }
        const ismatch = await bcrypt.compare(req.body.password, user.password);

        if (!ismatch) {
            return res.status(200).send({ message: `Invalid UserName or Password`, success: false })
        }
        //Now we need to generate a token so that our application is more secured


        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' }) //So after 1 day our token will expire and the user will need to login again after 1day

        // console.log(token)
        res.status(200).send({ message: `Logged in Successfully`, success: true, token })


    } catch (error) {
        console.log(error);
        res.status(500).send({ message: `Login Ctl error ${error.message}`, success: false })
    }


}



const authController = async (req, res) => {


    try {

        const user = await userModel.findOne({ _id: req.body.userId })
        user.password = undefined;
        if (!user) {
            return res.status(404).send({
                message: `user not found`,
                success: false
            })
        } else {
            // console.log(user.name)
            // console.log(user.email)
            res.status(200).send({
                success: true,
                data: user
            })
        }



    } catch (error) {
        console.log(error)
        res.status(500).send({ message: `auth error`, success: false, error })
    }


}

const applyDoctorController = async (req, res) => {


    try {

        const newdoctor = await doctorModel({ ...req.body, status: 'pending' })
        await newdoctor.save();
        const adminuser = await userModel.findOne({ isAdmin: true })

        const notification = adminuser.notification
        notification.push({
            type: "apply-doctor-request",
            message: `${newdoctor.firstname} ${newdoctor.lastname} has applied for a doctor account`,
            data: {
                doctorid: newdoctor._id,
                name: newdoctor.firstname + ' ' + newdoctor.lastname,
                onClickPath: '/admin/doctors'

            }

        })

        await userModel.findByIdAndUpdate(adminuser._id, { notification })




        res.status(200).send({
            success: true,
            message: `doctor account applided successfully`,


        })


    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            error,
            message: "Error while Applying for doctor"
        })
    }


}

const getAllNotificationController = async (req, res) => {



    try {


        const user = await userModel.findOne({ _id: req.body.userId });
        const seennotification = user.seennotification
        const notification = user.notification
        // seennotification.push(...notification)

        user.seennotification.push(...notification)
        user.notification = []
        const updatedUser = await user.save()
        updatedUser.password = undefined;



        res.status(200).send({
            success: true,
            message: `All notification marked as read`,
            data: updatedUser
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: `Error in getting Notification`
        })
    }

}


const deleteAllNotificationController = async (req, res) => {

    try {

        const user = await userModel.findOne({ _id: req.body.userId })
        user.notification = [];
        user.seennotification = [];
        const updateUser = await user.save();
        updateUser.password = undefined;

        res.status(200).send({
            success: true,
            message: `All notification are deleted`,
            data: updateUser
        })





    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: `unable to delete all notification`,
            error
        })
    }

}


const getAllDoctorsController = async (req, res) => {


    try {


        const doctors = await doctorModel.find({ status: 'approved' })
        res.status(200).send({
            success: true,
            message: `Doctors Fetched Successfully`,
            data: doctors
        })





    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: `Getting All Doctors Failed`,
            error

        })
    }
}

const bookAppointmentController = async (req, res) => {
    try {

        const date = dayjs(req.body.date, "DD-MM-YYYY").toISOString();

        const fromTime = dayjs(req.body.time, "HH:mm")
        .subtract(1, "hours")
        .toISOString();
      const toTime = dayjs(req.body.time, "HH:mm").add(1, "hours").toISOString();



      const doctorId = req.body.doctorId;
      const appointments = await appointmentModel.find({
        doctorId,
        date,
        time: {
          $gte: fromTime,
          $lte: toTime,
        },
      });


      if (appointments.length > 0) {
        return res.status(200).send({
          message: "Appointments not Availibale at this time",
          success: false,
        });
      }

      



  
      req.body.date =dayjs(req.body.date, "DD-MM-YYYY").toISOString();
      req.body.time =dayjs(req.body.time, "HH:mm").toISOString();

  

  
      req.body.status = "pending";

      console.log(req.body)
    //   console.log(req.body.status)
      const newAppointment = new appointmentModel(req.body);
      console.log(newAppointment)

      await newAppointment.save();
   
      const user = await userModel.findOne({ _id: req.body.doctorInfo.userId });
    
      user.notification.push({
        type: "New-appointment-request",
        message: `A New Appointment Request from ${req.body.userInfo.name}`,
        onCLickPath: "/user/appointments",
      });
      
      await user.save();
      res.status(200).send({
        success: true,
        message: "Appointment Book succesfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error While Booking Appointment",
      });
    }
  };
  
  // booking bookingAvailabilityController
  const bookingAvailabilityController = async (req, res) => {
    try {

      const date = dayjs(req.body.date, "DD-MM-YYYY").toISOString();
      const fromTime = dayjs(req.body.time, "HH:mm")
        .subtract(1, "hours")
        .toISOString();
      const toTime = dayjs(req.body.time, "HH:mm").add(1, "hours").toISOString();
      const doctorId = req.body.doctorId;
      const appointments = await appointmentModel.find({
        doctorId,
        date,
        time: {
          $gte: fromTime,
          $lte: toTime,
        },
      });
      if (appointments.length > 0) {
        return res.status(200).send({
          message: "Appointments not Availibale at this time",
          success: false,
        });
      } else {
        return res.status(200).send({
          success: true,
          message: "Appointments available",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error In Booking",
      });
    }
  };



  const userAppointmentsController = async(req,res)=>{


    try {

     

        const appointments = await appointmentModel.find({userId:  req.body.userId})
        res.status(200).send({
            success: true,
            message: `Succefully fetched appointments`,
            data: appointments

        })


        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: `Error in getting appointments`
        })
    }

  }

module.exports = { logincontroller, registercontroller, authController, applyDoctorController, getAllNotificationController, deleteAllNotificationController, getAllDoctorsController, bookAppointmentController,bookingAvailabilityController,userAppointmentsController }