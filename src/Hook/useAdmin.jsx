import React, { use, useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useAdmin = () => {
    const {user}=useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const {data:isAdmin, isPending:isAdminLoading}=useQuery({
        queryKey: ['isAdmin', user?.email],
        queryFn: async () => {
            const res =await axiosSecure.get(`/users/admin/${user?.email}`);
            return res.data?.admin;
        },
       
    })
    return [ isAdmin ,isAdminLoading]
};

export default useAdmin;