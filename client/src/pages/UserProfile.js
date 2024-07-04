import { useSelector } from "react-redux";
import Lay from "../components/Lay";

const UserProfile = () => {

const {user} = useSelector(state=>state.user)

    return ( 

        <Lay>
            <h1>My Profile</h1>
        </Lay>
        

     );
}
 
export default UserProfile;