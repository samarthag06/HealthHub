import { useDispatch, useSelector } from 'react-redux';
import '../styles/Layout_styles.css';
import { UserMenu, adminData } from './../sidebardata/SidebarData';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Badge, message } from 'antd';
import { setUser } from '../redux/features/userSlice';



const Lay = ({ children }) => {

    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch()
    const location = useLocation();
    const history = useHistory();


    //rendering Menu list



    const handle_logout = () => {
        localStorage.clear();
        message.success('Logout Successfully');
        dispatch(setUser(null))
        history.push('./login');



    }


    //================Doctor menu==========================

    const doctorMenu = [


        {
            name: 'Home',
            Path: '/',
            icon_class: 'fa-solid fa-house'

        },
        {
            name: 'Appointments',
            Path: '/doctor-appointments',
            icon_class: "fa-solid fa-list"

        }
        ,
        {
            name: 'My-Profile',
            Path: `/doctor/profile/${user?._id}`,
            icon_class: 'fa-sharp fa-solid fa-user'
        },


    ];

    //================Doctor menu==========================


    const SidebarData = user?.isAdmin ? adminData : user?.isDoctor ? doctorMenu : UserMenu;















    return (
        <>
            <div className="main">
                <div className="layout">
                    <div className="sidebar">
                        <div className="logo">
                            <h6>DOC-APP</h6>
                            <hr></hr>
                        </div>
                        <div className="menu">
                            {SidebarData.map((menu, index) => {
                                const isactive = location.pathname === menu.Path; // Log the pathname here
                                return (
                                    <div className={`menu_item ${isactive && 'active'}`} key={index}>
                                        <i className={menu.icon_class}></i>
                                        <Link to={menu.Path}>{menu.name}</Link>
                                    </div>
                                );



                            })}

                            <div className={`menu_item `} onClick={handle_logout}>
                                <i className='fa-solid fa-right-from-bracket'></i>
                                <Link to='/login'>Logout</Link>
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        <div className="header">
                            <div className="header_content">
                                <Badge count={user && user.notification.length} onClick={() => { history.push('/notification') }} style={{ cursor: 'pointer' }}>
                                    <i className="fa-solid fa-bell"></i>
                                </Badge>


                                {user?.isDoctor ? (
                                    <Link to={`/doctor/profile/${user?._id}`}>{user?.name}</Link>
                                ) : (
                                    <span>{user?.name}</span>
                                )}

                            </div>
                        </div>
                        <div className="body">{children}</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Lay;
