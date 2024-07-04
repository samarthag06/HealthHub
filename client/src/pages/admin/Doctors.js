import { Table, message } from "antd";
import Lay from "../../components/Lay";
import axios from 'axios'
import { useEffect,useState } from "react";

const Doctors = () => {

 
    const [doctors,setdoctors] =useState([])


    const getdoctors=async()=>{

        try {
        
            const res= await axios.get('/api/v1/admin/getAllDoctors',{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            
            if(res.data.success){
                setdoctors(res.data.data)
        
            }else{
        console.log(res.data.message)
            }
        } catch (error) {
            console.log(error)
        }
        
        }

        const handleAccountStatus = async(record,status)=>{

            try {
                
                const res = await axios.post('/api/v1/admin/changeAccountStatus',{doctorId: record._id, userId : record.userId,status: status},{
                    headers:{
                        Authorization : `Bearer ${localStorage.getItem('token')}`
                    }
                })

                if(res.data.success){
                    message.success(res.data.message)
                    window.location.reload();
                }


            } catch (error) {
                console.log(error)
                message.error('something went wrong')

            }
        }
        
        useEffect(()=>{getdoctors()},[])

        const columns = [
            {
              title: "Name",
              dataIndex: "name",
              render: (text, record) => (
                <span>
                  {record.firstname} {record.lastname}
                </span>
              ),
            },
            {
              title: "Status",
              dataIndex: "status",
            },
            {
              title: "phone",
              dataIndex: "phone",
            },
            {
              title: "Actions",
              dataIndex: "actions",
              render: (text, record) => (
                <div className="d-flex">
                  {record.status === "pending" ? (
                    <button className="btn btn-success" onClick={()=>{handleAccountStatus(record, 'approved')}}>Approve</button>
                  ) : (
                    <button className="btn btn-danger">Reject</button>
                  )}
                </div>
              ),
            },
          ];




    return (  
 
      <Lay>
        <h1 className="text-center m-3">All Doctors</h1>
      <Table columns={columns} dataSource={doctors} />
      </Lay>


    );
}
 
export default Doctors;