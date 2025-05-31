import axios from 'axios';
import { a } from 'framer-motion/client';
import React from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
export const axiosSecure =axios.create({
    baseURL: 'http://localhost:5000',
});
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const {logOut}=useContext(AuthContext);
    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem('access-token');
        
            config.headers.authorization = `Bearer ${token}`;
        
        return config;
       
    },function(error){
        return Promise.reject(error);
    }
)
    // Add a response interceptor
    axiosSecure.interceptors.response.use(function(response){
        return response;
    },async(error)=>{
        if(error.response && (error.response.status === 401 || error.response.status === 403)){
            // console.log('unauthorized or forbidden');
            await logOut();
            navigate('/login');
        }
        return Promise.reject(error);

    })
    return axiosSecure;
};

export default useAxiosSecure;