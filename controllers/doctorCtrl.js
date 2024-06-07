
const appointmentModel = require('../models/appointmentModel')
const doctorModel = require('../models/doctorModel')
const userModel = require('../models/userModels')



const getDoctorInfoController =async(req,res)=>{

try {


    const doctor = await doctorModel.findOne({userId: req.body.userId})

    res.status(200).send({
        success: true,
        message:  `Doctor info fetch success`,
        data: doctor
    })
    
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        error,
        message: `Error in fething doctor info`,
       

    })
}
}


const updateProfileController =async(req,res)=>{

    try {
        
        const doctor = await doctorModel.findOneAndUpdate({ userId: req.body.userId }, req.body, { new: true });
        
        res.status(200).send({
            success: true,
            message: `Doctor Profile Updated`,
            data: doctor
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: `Failed to update Doctor Profile`,
            error
        })
    }
}

const getDoctorByIdController= async (req,res)=>{


try {


    const doctor = await doctorModel.findOne({_id: req.body.doctorId})
    res.status(200).send({
        success:true,
        message: `Single Doc info fetched`,
        data: doctor
    })

    
} catch (error) {
    console.log(error)
    res.status(500).send({
        success : false,
        message : `Failed to get Doctor`,
        error
    })
}
}


const doctorAppointmentsController = async (req,res)=>{


    try {

        const doctor = await doctorModel.findOne({userId:req.body.userId})

        const appointments  = await appointmentModel.find({doctorId: doctor._id})


        res.status(200).send({
            success: true,
            message: `Doctor appointments fetched successfully`,
            data: appointments
        })

        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: `Error in fethching appointments`,
            error
        })
    }


}

const updateStatusController = async(req,res)=>{


    try {
        

        const status = req.body.status;
        const appointmentsId = req.body.appointmentsId

        console.log(status,appointmentsId)
       

    

        const appointments  = await appointmentModel.findByIdAndUpdate(appointmentsId,{status})

        const user = await userModel.findOne({
            _id: appointments.userId
        })

        user.notification.push({
            type: `status-updated`,
            message: `Your Appointment has been ${status}`,
            onclickPath: '/doctor-appointments',

        })
await user.save();

res.status(200).send({
    success: true,
    message: `Appointment status updated`
})


        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: `Error in Updating status`,
            error
        })
    }


}


module.exports={getDoctorInfoController,updateProfileController,getDoctorByIdController, doctorAppointmentsController,updateStatusController}