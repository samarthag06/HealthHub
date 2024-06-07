const doctorModel = require('../models/doctorModel')
const userModel =require('../models/userModels');


const getAllUsersController = async (req,res)=>{

 try {

    const users= await userModel.find({})
    res.status(200).send({
        success: true,
        message: `users data list`,
        data: users
    })
    
 } catch (error) {
    console.log(error)
    res.status(500).send({
        success: false,
        message: `Error while fetching users`,
        error
    })
 }
}
const getAllDoctorsController = async (req, res) => {
    try {
        const doctors = await doctorModel.find({});
        res.status(200).send({
            success: true,
            message: `Doctors data list`,
            data: doctors
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Error while fetching doctors`,
            error
        });
    }
};


const changeAccountStatusController = async(req,res)=>{


try {

    const {doctorId,status} = req.body
    const doctor =await doctorModel.findByIdAndUpdate(doctorId, {status},{ new: true })
    console.log(doctor.userId);
    const user = await userModel.findOne({_id: doctor.userId})
    
    user.notification.push({
        type: `Doctor-account-status-updated`,
        message: `your doctor account request has been ${status}`,
        onClickPath:  "/notification" 

    })
    user.isDoctor = doctor.status=== "approved"? true:false

    await user.save();
    res.status(200).send({
        success: true,
        message: `Account status updated`,
        data: doctor
    })
    
} catch (error) {
    comnsole.log(error)
    res.status(500).semd({
        success: false,
        message: `Error in account status`
    })
}

}

module.exports = {getAllDoctorsController, getAllUsersController, changeAccountStatusController}