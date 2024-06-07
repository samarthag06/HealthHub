const mongoose = require('mongoose')


//creating schema

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'name is required']
    }
    ,
    email: {

        type: String,
        required: [true, 'email is required']


    }
    ,

    password: {

        type: String,
        required: [true, 'password is required']

    },

    isAdmin: {
        type: Boolean,
        default: false
    },
    
    isDoctor: {
        type: Boolean,
        default: false

    },
    notification: {
        type: Array,
        default: []

    }
    ,
    seennotification: {
        type: Array,
        default: []
    }



})

// creating model or locking schema

const userModel = mongoose.model('users', userSchema)

//exporting model
module.exports = userModel;