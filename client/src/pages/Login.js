import { Form, Input, message } from 'antd'

import { useDispatch} from 'react-redux'
import { showLoading,hideLoading } from '../redux/features/alertSlice'

import { Link , useHistory } from 'react-router-dom'

import axios from 'axios'



const Login = () => {
    
    const history= useHistory();
    
    const dispatch = useDispatch();

    const onFinish = async (values) => {
     
      
      
   try {

    dispatch(showLoading())

    const res = await axios.post('/api/v1/user/login',values);

    dispatch(hideLoading())

    if(res.data.success){

        localStorage.setItem("token",res.data.token);
        message.success(`Login Successful`)
        history.push('/')
    }else{
        message.error(res.data.message);
       }





    
   } catch (error) {

    dispatch(hideLoading())
    console.log(error)
    message.error('something went wrong')
   }




    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (

        <div className="Form_container">


            <Form className="form_only card" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>

                <h1 className="text-center">Login Here!!</h1>

                <Form.Item label="Email" name="email">
                    <Input required type="email" value="Enter Email Address"></Input>
                </Form.Item>

                <Form.Item label="Password" name="password">
                    <Input required type="password" value="Enter Your Password"></Input>
                </Form.Item>

                <Link className="Alreadyuser" to="/register">Not a User</Link>

                <button className="btn btn-primary">Login</button>


            </Form>








        </div>









    );
}

export default Login;