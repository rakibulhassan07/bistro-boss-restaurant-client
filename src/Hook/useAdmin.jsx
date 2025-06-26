import React, { use, useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useAdmin = () => {
    const {user, loading}=useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const {data:isAdmin, isPending:isAdminLoading, error}=useQuery({
        queryKey: ['isAdmin', user?.email],
        enabled : !loading && !!user?.email,
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/users/admin/${user?.email}`);
                console.log('Admin check response:', res.data);
                return res.data?.admin;
            } catch (error) {
                console.error('Error checking admin status:', error);
                return false;
            }
        },
       
    });
    
    console.log('useAdmin - User Email:', user?.email);
    console.log('useAdmin - Is Admin:', isAdmin);
    console.log('useAdmin - Loading:', isAdminLoading);
    console.log('useAdmin - Error:', error);
    
    return [ isAdmin, isAdminLoading]
};

export default useAdmin;