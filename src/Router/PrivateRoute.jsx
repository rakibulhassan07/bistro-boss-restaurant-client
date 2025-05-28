import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import { form } from 'framer-motion/client';




const PrivateRoute = ({children}) => {
    const {user,loading}=useContext(AuthContext);
    const location =useLocation();
    
    if(loading){
        return <progress className="progress w-56"></progress>
    }

    if(user){
        return children;
    }
    return <Navigate to='/login' state={{form: location}} replace></Navigate>
};

export default PrivateRoute;