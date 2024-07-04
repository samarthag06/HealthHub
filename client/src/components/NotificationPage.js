import { useDispatch, useSelector } from "react-redux";
import Lay from "./Lay";
import { Tabs, message } from "antd";
import { hideLoading, showLoading } from "../redux/features/alertSlice";

import axios from 'axios'
import { useHistory } from "react-router-dom"
import { setUser } from "../redux/features/userSlice";

const NotificationPage = () => {

    const dispatch = useDispatch();
    const history = useHistory()

    const { user } = useSelector(state => state.user)
    const markAllNotification = async () => {

        try {

            dispatch(showLoading());

            const res = await axios.post('/api/v1/user/get-all-notification', { userId: user._id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })


            if (res.data.success) {
                dispatch(hideLoading())
                dispatch(setUser(res.data.updatedUser))

                message.success(res.data.message)

            } else {
                dispatch(hideLoading())
                message.error(res.data.message)
            }


        } catch (error) {
            dispatch(hideLoading());
            console.log(error)
            message.error('Marking Read error')
        }


    }
    const deleteAllNotification = async () => {
        try {

            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/delete-all-notification', { userId: user._id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            dispatch(hideLoading())
            if (res.data.success) {

                dispatch(setUser(res.data.updatedUser))
                message.success(res.data.message)
            } else {

                message.success(res.data.message)
            }



        } catch (error) {

            dispatch(hideLoading())
            console.log(error)
            message.error('something went wrong')
        }



    }



    return (
        <Lay>
            <h3 className="m-3 text-center">
                Notification Page
            </h3>

            <Tabs>
                <Tabs.TabPane tab='Unread' key={0}>
                    <div className="d-flex justify-content-end">
                        <h4 className="p-2" onClick={markAllNotification} style={{ cursor: 'pointer' }}>Mark All as Read</h4>

                    </div>


                    {
                        user?.notification.map((notificationmsg, index) => {

                            return (
                                <div className="card" onClick={() => { history.push(notificationmsg.data.onClickPath) }} style={{ cursor: 'pointer' }} key={index}>
                                    <div className="card-text">{notificationmsg.message}</div>
                                </div>);
                        })


                    }
                </Tabs.TabPane>
                <Tabs.TabPane tab='Read' key={1}>
                    <div className="d-flex justify-content-end">
                        <h4 className="p-2" onClick={deleteAllNotification} style={{ cursor: 'pointer' }}>Delete All Read</h4>

                    </div>


                    {
                        user?.seennotification.map((seennotificationmsg, index) => {

                            return (
                                <div className="card" onClick={() => { history.push(seennotificationmsg.data.onClickPath) }} style={{ cursor: 'pointer' }} key={index}>
                                    <div className="card-text">{seennotificationmsg.message}</div>
                                </div>);
                        })


                    }


                </Tabs.TabPane>
            </Tabs>




        </Lay>


    );
}

export default NotificationPage;