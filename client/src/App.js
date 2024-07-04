import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PublicRoute from './components/PublicRoute'
import ProtectedRoutes from './components/ProtectedRoutes'

import Spinner from './components/Spinner.js';
import { useSelector } from 'react-redux';


import "antd/dist/reset.css" //CSS file provided by Ant Design, a popular React UI library. This file is typically used to reset or normalize
// the default styles across different browsers to ensure a consistent look and feel for web applications.


import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import ApplyDoctor from './pages/ApplyDoctor.js';
import NotificationPage from './components/NotificationPage.js';
import Users from './pages/admin/Users.js';
import Doctors from './pages/admin/Doctors.js';
import Profile from './pages/doctor/Profile.js';
import BookingPage from './pages/doctor/BookingPage.js';
import Appointments from './pages/Appointments.js';
import DoctorAppointments from './pages/doctor/DoctorAppointments.js';
import UserProfile from './pages/UserProfile.js';


function App() {

  const {loading} =useSelector(state=> state.alerts)

  return (


    <>

    {loading ? <Spinner/> :

    <Router>

    <Switch>

      <Route exact path='/'>
<ProtectedRoutes>
<Home></Home>
</ProtectedRoutes>
   
      </Route>


      <Route path='/login'>
<PublicRoute> <Login>

</Login></PublicRoute>
       
      </Route>



      <Route path='/register'>
<PublicRoute> <Register>

</Register></PublicRoute>
       
      </Route>

      <Route exact path='/applyDoctor'>
<ProtectedRoutes>
<ApplyDoctor></ApplyDoctor>
</ProtectedRoutes>
   
      </Route>

      
      <Route exact path='/admin/users'>
<ProtectedRoutes>
<Users></Users>
</ProtectedRoutes>
   
      </Route>

      <Route exact path='/admin/doctors'>
<ProtectedRoutes>
<Doctors></Doctors>
</ProtectedRoutes>
   
      </Route>

      <Route exact path='/notification'>
<ProtectedRoutes>
<NotificationPage></NotificationPage>
</ProtectedRoutes>
   
      </Route>

      <Route exact path='/doctor/profile/:id'>
<ProtectedRoutes>

<Profile></Profile>
</ProtectedRoutes>
   
      </Route>

      <Route exact path='/doctor/book-appointment/:doctorId'>
<ProtectedRoutes>
<BookingPage></BookingPage>
</ProtectedRoutes>
   
      </Route>

      <Route exact path='/appointments'>
<ProtectedRoutes>
<Appointments></Appointments>
</ProtectedRoutes>
   
      </Route>

      <Route exact path='/UserProfile'>
<ProtectedRoutes>
<UserProfile></UserProfile>
</ProtectedRoutes>
   
      </Route>


      <Route exact path='/doctor-appointments'>
<ProtectedRoutes>
<DoctorAppointments></DoctorAppointments>
</ProtectedRoutes>
   
      </Route>

    </Switch>


  </Router>

    
    
    }

      
    </>





  );
}

export default App;
