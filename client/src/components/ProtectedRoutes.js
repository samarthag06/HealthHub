import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import { setUser } from '../redux/features/userSlice';
import { useEffect } from 'react';


export default function ProtectedRoutes(
    { children }
) {


    const history = useHistory();

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user)


    const getUser = async () => {

        try {

            dispatch(showLoading());

            const res = await axios.post('/api/v1/user/getUserData', { token: localStorage.getItem('token') },
                {
                    headers: {
                        Authorization:`Bearer ${localStorage.getItem('token')}`
                    }
                })

            dispatch(hideLoading());

            if (res.data.success) {
                
            
                dispatch(setUser(res.data.data));
               


            } else {
                
                history.push('/login')
                localStorage.clear()

            }



        } catch (error) {
            dispatch(hideLoading())
            localStorage.clear()
            console.log(error)
        }



    };


    useEffect(() => {
        if (!user) { getUser(); }

    }, [user, getUser]);



    if (localStorage.getItem('token')) {
        return children
    } else {

        history.push('./login');

    }



}

