import { useSelector } from "react-redux";
import Lay from "../../components/Lay";
import { useState } from "react";
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';

import { Col, Form, Input, Row, TimePicker, message } from "antd";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"
import { hideLoading, showLoading } from "../../redux/features/alertSlice";
import moment from 'moment'
import dayjs from "dayjs";


const Profile = () => {

    const { user } = useSelector(state => state.user)

    const [doctor, setDoctor] = useState(null)

    const params = useParams()
    const dispatch = useDispatch()
    const history = useHistory()


    const handlerFinish = async (values) => {

        try {
            dispatch(showLoading());
            const res = await axios.post('/api/v1/doctor/updateProfile', {
                ...values,
                userId: user._id,
                timings: [
                    moment(values.timings[0]).format("HH:mm"),
                    moment(values.timings[1]).format("HH:mm")
                ]
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message);
                history.push('/')
            } else {
                message.error(res.data.message)
            }


        } catch (error) {
            dispatch(hideLoading())
            console.log(error)
            message.error('Something Went wrong')
        }


    }







    const getDoctorInfo = async () => {

        try {

            console.log(params.id)
            const res = await axios.post('/api/v1/doctor/getDoctorInfo', { userId: params.id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`

                }
            })


            if (res.data.success) {
                setDoctor(res.data.data)
            }

        } catch (error) {
            console.log(error)
        }


    }

    useEffect(() => {
        getDoctorInfo();
    }, [])




    const handleTimeChange = (time, timeString) => {
        console.log(time, timeString);
        // setTimings(timeString);
    };





    return (
        <Lay>
            <h1>Manage Profile</h1>

            {doctor && (





                <Form layout="vertical" onFinish={handlerFinish} className="m-3" initialValues={{
                    ...doctor,
                    timings: [
                        dayjs(doctor.timings[0], "HH:mm"),
                        dayjs(doctor.timings[1], "HH:mm"),
                    ],
                }}>


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
                                <TimePicker.RangePicker
                                    format="HH:mm"
                                    onChange={handleTimeChange}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}></Col>
                        <Col xs={24} md={24} lg={8}>
                            <button className="btn btn-primary form-btn doc-form-btn" type="submit">
                                Update
                            </button>
                        </Col>
                    </Row>



                </Form>







            )}

        </Lay>
    );
}

export default Profile;