import Lay from "../../components/Lay";
import axios from 'axios'
import moment from 'moment'
import { Table, message } from "antd";
import { useState, useEffect } from "react";


const DoctorAppointments = () => {


    const [appointments, setAppointments] = useState([])

    const getAppointments = async () => {


        try {

            const res = await axios.get('/api/v1/doctor/get-appointments', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            if (res.data.success) {
                setAppointments(res.data.data);

            }

        } catch (error) {
            console.log(error)

        }





    }

    useEffect(() => {
        getAppointments()
    }, [])


    const handleStatus = async (record, status) => {

        try {

            console.log(record,status)

            const res = await axios.post('/api/v1/doctor/update-status',{appointmentsId: record._id,status},{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if(res.data.success){
                console.log('hii')
                message.success(res.data.message)
            }

        } catch (error) {
            console.log(error)
            message.error('Something went wrong')
            getAppointments()
        }
    }


    const columns = [


        {
            title: 'ID',
            dataIndex: '_id'
        },

        {
            title: 'Status',
            dataIndex: 'status',

        },
        {
            title: 'Date & Time',
            dataIndex: 'date',
            render: (text, record) => (
                <span>
                    {moment(record.date).format("DD-MM-YYYY")} {" "}
                    {moment(record.time).format("HH:mm")}
                </span>
            )
        }, {


            title: `Actions`,
            dataIndex: `Actions`,
            render: (text, record) => (
                <div className="d-flex">
                    {record.status === 'pending' && (
                        <div className="d-flex">
                            <button className="btn btn-success" onClick={() => {
                              
                                handleStatus(record, 'approved') }}>Approve</button>
                            <button className="btn btn-danger" onClick={() => { handleStatus(record, 'reject') }}>Reject</button>
                        </div>
                    )}
                </div>
            )


        }



    ]


    return (

        <Lay>
            <h1>Appointment List</h1>

            <Table columns={columns} dataSource={appointments}></Table>

        </Lay>

    );
}

export default DoctorAppointments;