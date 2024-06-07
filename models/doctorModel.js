const mongoose = require('mongoose')


const doctorSchema = new mongoose.Schema({

    userId: {
        type: String

    },


    firstname: {
        type: String,
        required: [true, 'firstname is required']


    },
    lastname: {
        type: String,
        required: [true, 'lastname is required']

    },

    phone:
    {
        type: String,
        required: [true, 'phoneNo. is required']

    }
    ,
    email: {
        type: String,
        required: [true, 'Email is required']


    },
    website: {

        type: String
    },
    address: {
        type: String,
        required: [true, 'Address is required']
    },
    specialization:{
        type: String,
        
        required: [true, 'Specialization is required']
    },
    experience:{

        type: String,
        
        required: [true, 'Experience is required']
    },
feesPerConsultation:{
    type: Number,
        
    required: [true, 'Fees is required']

},
status:{
    type: String,
default:'pending'
}
,
timings:{
    type: Array,
    required: [true, 'Timing is required']

}


},{timestamps:true}
);

const doctorModel = mongoose.model('doctors', doctorSchema);

module.exports = doctorModel;