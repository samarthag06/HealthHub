const mongoose = require('mongoose')

const colors= require('colors')

const connectodb = async ()=>{
 
    try{

    await mongoose.connect(process.env.MONGO_URL)
    console.log(`connection established with host ${mongoose.connection.host}`.bgGreen.white)
    }catch(error){

        console.log(`MongoDb server Connection issue ${error}`.bgCyan.white)
    }
}

module.exports = connectodb