import {useHistory} from 'react-router-dom'

const PublicRoute = ({children}) => {

    
const history= useHistory();
   
    if(localStorage.getItem('token')){
       history.push('/');
    }
else{

return children;
}


}
 
export default PublicRoute;