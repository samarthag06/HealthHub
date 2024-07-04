import { Table } from "antd";
import Lay from "../../components/Lay";
import axios from 'axios'
import { useEffect,useState } from "react";

const Users = () => {

const [users,setusers] = useState([]);


const getusers=async()=>{

try {

    const res= await axios.get('/api/v1/admin/getAllUsers',{
        headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    
    if(res.data.success){
        setusers(res.data.data)

    }else{
console.log(res.data.message)
    }
} catch (error) {
    console.log(error)
}

}

useEffect(()=>{getusers()},[])


const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Doctor",
      dataIndex: "isDoctor",
      render: (text, record) => <span>{record.isDoctor ? "Yes" : "No"}</span>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <button className="btn btn-danger">Block</button>
        </div>
      ),
    },
  ];



    return (

        <Lay>

            <h1 className="text-center m-2">Users List</h1>
      <Table columns={columns} dataSource={users} />
        </Lay>
      );
}
 
export default Users;