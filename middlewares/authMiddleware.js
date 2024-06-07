const JWT = require('jsonwebtoken')

//we will protect routes on the basis of token for that we will create a middleware that will get the token and compare if it is valid than we will show the user that route 
//simply next function is called a middleware 
//just add next to a normal callback function

module.exports= async (req,res,next)=>{

   try {



 // we will first get the token 
    // NOte that token is in the header of request 
    // in body we have the data
    // console.log("new")
    // console.log(req.headers['authorization'].split(" ")[1])
    const token = req.headers['authorization'].split(" ")[1]


    //since token is of the form bearer jinivnbfdnvnfv
    //After getting the token we will verify it on the basis of secret key which we used to encrypt it

    JWT.verify(token,process.env.JWT_SECRET, (err,decode)=>{
          if(err){
            console.log('errr')
            return res.status(401).send({message: 'Auth Failed', success:false})
            
          }else{

            // console.log('decode')
            req.body.userId = decode.id;
            
            // console.log(decode.id)
            next();
          }
    })




    
   } catch (error) {

    console.log(error);
    res.status(401).send({message: `Auth Failed`, success: false})
    
   }



}

