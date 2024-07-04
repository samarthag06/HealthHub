import { useDispatch, useSelector } from 'react-redux';



export const UserMenu = [


    {
        name: 'Home',
        Path: '/',
        icon_class: 'fa-solid fa-house'

    },
    {
        name: 'Appointments',
        Path: '/appointments',
        icon_class: "fa-solid fa-list"

    },

    {
        name: 'Apply-Doctor',
        Path: '/applyDoctor',
        icon_class: 'fa-solid fa-user-doctor'

    }
    
   

];


export const adminData = [


    {
        name: 'Home',
        Path: '/',
        icon_class: 'fa-solid fa-house'

    },
   
    {
        name: 'Doctors',
        Path: '/admin/doctors',
        icon_class: 'fa-solid fa-user-doctor'

    }
    , 
    {
        name: 'Users',
        Path: '/admin/users',
        icon_class: 'fa-sharp fa-solid fa-user'
    },

    {
        name: 'My-Profile',
        Path: '/UserProfile',
        icon_class: 'fa-sharp fa-solid fa-user'
    },


];