import { useEffect, useState } from "react";
import axios from 'axios'
import { Layout, Row } from "antd";
import Lay from "../components/Lay";
import Doctorlist from "../components/Doctorlist";



const Home = () => {

  const [doctors,setdoctors] =useState([]);

 
  const getUserData =async ()=>{
    
    try {
   
       // we will send the token to the backend
     
       const res = await axios.get('/api/v1/user/getAllDoctors',{
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        }
       })

       if(res.data.success){
  
        setdoctors(res.data.data)
       }

       

      
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(()=>{
    getUserData();
  },[]);
 
   




    return (

        
      <>
   <Lay>
    <h1 className="text-center">Home Page

    <Row>
        {doctors && doctors.map((doctor) => <Doctorlist doctor={doctor} />)}
      </Row>


    </h1>
   </Lay>
      </>
      );
}
 
export default Home;