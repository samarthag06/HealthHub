const express = require('express')
const colors = require('colors')
const moragan = require('morgan')
const dotenv = require('dotenv')
const connectodb= require("./config/db")
const cors =require('cors')
const path = require('path')


dotenv.config();
connectodb();

// initialize the express app.
const app = express();





//Configuring dotenv


//


// Adding middleWares
app.use(cors())

app.use(express.json())// beacuse when we parse body as json object we get error.

app.use(moragan('dev'))//morgan is a logger middleware When you use app.use(morgan('dev')),
// you are telling your Express app to use morgan to log all incoming HTTP requests using the 'dev' format.
//The 'dev' format provides a concise output colored by response status for development use. It outputs the
//method (GET, POST, etc.), the URL, the response status, the response time, and the length of the response.




//app.use is used to mount middleware functions at a specified path.

app.use('/api/v1/user', require('./routes/userRoutes'))
app.use('/api/v1/admin',require('./routes/adminRoutes'))


app.use('/api/v1/doctor',require('./routes/doctorRoutes'))

//static files
app.use(express.static(path.join(__dirname,'./client/build')))

app.get('*',function (req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
})


const port=process.env.PORT||8080

app.listen(port,()=>{
console.log(`server running in ${process.env.NODE_MODE} on port ${port}`.bgCyan.white)

})