import Lay from "../../components/Lay";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import dayjs from 'dayjs';
import { DatePicker, TimePicker, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";

const BookingPage = () => {
    const [isAvailable, setIsAvailable] = useState(false);
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const params = useParams();
    const [doctors, setDoctors] = useState({});

    const getUserData = async () => {
        try {
            const res = await axios.post('/api/v1/doctor/getDoctorById', { doctorId: params.doctorId }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                }
            })
            if (res.data.success) {
                setDoctors(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUserData();
    }, []);

    const handleBooking = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/book-appointment', {
                doctorId: params.doctorId,
                userId: user._id,
                doctorInfo: doctors,
                date: date,
                time: time,
                userInfo: user
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message);
            }else if(!res.data.success){
                message.error(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error('Error in Booking Appointment');
        }
    }

    const handleAvailability = async (e) => {
        e.preventDefault();
        try {
           
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/booking-availability', { doctorId: params.doctorId, date, time }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(hideLoading());
            if (res.data.success) {
                setIsAvailable(true);
                console.log('yyyy')
                // console.log(isAvailable)
               
                message.success(res.data.message);
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
        }
    }


    
    // useEffect(() => {
    //     console.log("isAvailable:", isAvailable);
    // }, [isAvailable]);

    return (
        <Lay>
            <h3>Booking Page</h3>
            <div className="container m-2">
                {doctors && (
                    <div>
                        <h4>Dr.{doctors.firstname} {doctors.lastname}</h4>
                        <h4>Fees : {doctors.feesPerConsultation}</h4>
                        <h4>Timings : {doctors.timings && doctors.timings[0]} - {doctors.timings && doctors.timings[1]}</h4>
                        <div className="d-flex flex-column w-50">
                            <DatePicker
                                className="m-2"
                                format="DD-MM-YYYY"
                                onChange={(value) => setDate(dayjs(value).format("DD-MM-YYYY"))}
                            />
                            <TimePicker
                                format="HH:mm"
                                className="m-2"
                                onChange={(value) => setTime(dayjs(value).format("HH:mm"))}
                            />
                           
                
                            
                                <button className="btn btn-dark mt-2" onClick={handleBooking} >Book Now</button>
                            
                        </div>
                    </div>
                )}
            </div>
        </Lay>
    );
}

export default BookingPage;
