import Lay from "../components/Lay";
import axios from 'axios'
import { useState,useEffect } from "react";
import moment from "moment";
import { Table } from "antd";
import dayjs from 'dayjs'


const Appointments = () => {

 
    const [appointments,setAppointments] = useState([])

    const getAppointments = async()=>{

        try {

            const res = await axios.get('/api/v1/user/user-appointments',{headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }})
            

            if(res.data.success){
                setAppointments(res.data.data)
            }

        } catch (error) {
            console.log(error)

        }
    }

    useEffect(()=>{
        getAppointments()
    },[])


    const columns  = [


        {title:'ID',
            dataIndex: '_id'
        },{
            title: 'Name',
            dataIndex:'name',
            render: (text,record)=>(
                <span>
                    {record.doctorId.firstname} {record.doctorId.lastname}
                </span>
            )
        },
        {
            title: 'Phone',
            dataIndex:'phone',
            render: (text,record)=>(
                <span>
                    {record.doctorId.phone}
                </span>
            )
        },
        {
            title: 'Status',
            dataIndex:'status',
           
        },
        {
            title: 'Date & Time',
            dataIndex:'date',
            render: (text,record)=>(
                <span>
                    {dayjs(record.date).format("DD-MM-YYYY")} {" "}
                    {dayjs(record.time).format("HH:mm")}
                </span>
            )
        }



    ]





    return ( 
 
        <Lay>
            <h1>Appointment List</h1>

            <Table columns = {columns} dataSource={appointments}></Table>

                </Lay>


     );
}
 
export default Appointments;