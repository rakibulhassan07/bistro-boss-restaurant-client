import { useQuery } from '@tanstack/react-query';
import React, { use } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';

const useCart = () => {
    const axiosSecure = useAxiosSecure();
    const {user}=useContext(AuthContext);
    const { refetch,data:cart=[]}=useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`/carts?email=${user?.email}`); 
            return response.data;
        }
    });
    return [cart,refetch]
};

export default useCart;