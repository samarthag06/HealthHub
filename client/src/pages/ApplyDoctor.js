import { Col, Form, Input, Row, TimePicker, message } from "antd";
import Lay from "../components/Lay";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom"
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from 'axios'
import moment from "moment";
import dayjs from 'dayjs'

const ApplyDoctor = () => {


  const {user} =useSelector(state=> state.user)
  const history = useHistory();
  const dispatch =useDispatch();

    const handlerFinish= async (values)=>

        {

try {
  dispatch(showLoading());
  const res = await axios.post('/api/v1/user/applyDoctor',{...values, userId:user._id, timings: [
    dayjs(values.timings[0]).format("HH:mm"),
    dayjs(values.timings[1]).format("HH:mm"),
  ]},{
  
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
 
  dispatch(hideLoading());
  if(res.data.success){
    message.success(res.data.message);
    history.push('/')
  }else{
    message.error(res.data.message)
  }

  
} catch (error) {
  dispatch(hideLoading())
  console.log(error)
  message.error('Something Went wrong')
}


        }



    return ( 
   
      
<Lay>

<h1 className="Applydoc_title">Apply Doctor</h1>
<Form layout="vertical" onFinish={handlerFinish} className="m-3">


<h4 className="">Personal Details : </h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="First Name"
              name="firstname"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your first name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Last Name"
              name="lastname"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your last name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Phone No"
              name="phone"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your contact no" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Email"
              name="email"
              required
              rules={[{ required: true }]}
            >
              <Input type="email" placeholder="your email address" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Website" name="website">
              <Input type="text" placeholder="your website" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Address"
              name="address"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your clinic address" />
            </Form.Item>
          </Col>
        </Row>
        <h4>Professional Details :</h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Specialization"
              name="specialization"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your specialization" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Experience"
              name="experience"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your experience" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Fees Per Cunsaltation"
              name="feesPerConsultation"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your contact no" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Timings" name="timings" required>
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}></Col>
          <Col xs={24} md={24} lg={8}>
            <button className="btn btn-primary form-btn doc-form-btn" type="submit">
              Submit
            </button>
          </Col>
        </Row>



</Form>
</Lay>


     );
}
 
export default ApplyDoctor;