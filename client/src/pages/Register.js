import { Link , useHistory } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { showLoading,hideLoading } from '../redux/features/alertSlice'

import { Form, Input, message } from 'antd'


import axios from 'axios'


const Register = () => {
    const history= useHistory();

    const dispatch = useDispatch();


    const onFinish = async (values) => {
       
        try{
                 
            dispatch(showLoading());
            const res= await axios.post('/api/v1/user/register',values)
            dispatch(hideLoading())

               if(res.data.success){
                message.success('Registered Successfully!')
                history.push('./login')
               }else{
                message.error(res.data.message);
               }

             

        }catch(error){
            dispatch(hideLoading())
            console.log(error)
            message.error('Something went wrong!!')

        }



    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    return (


        <div className="Form_container">
        

            <Form  className="form_only card" layout="vertical" onFinish={onFinish}  onFinishFailed={onFinishFailed}>

            <h1 className="text-center">Register Here!!</h1>
           
                <Form.Item label="UserName" name="name">
                    <Input required type="text" value="Enter the Username"></Input>
                </Form.Item>

                <Form.Item label="Email" name="email">
                    <Input required type="email" value="Enter Email Address"></Input>
                </Form.Item>

                <Form.Item label="Password" name="password">
                    <Input required type="password" value="Enter Your Password"></Input>
                </Form.Item>
                <Link className="Alreadyuser" to="/login">Already User Login here</Link>
           <button className= "btn btn-primary">Register</button>


            </Form>








        </div>




    );
}

export default Register;