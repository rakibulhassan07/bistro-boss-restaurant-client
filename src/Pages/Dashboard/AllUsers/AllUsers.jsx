import React from 'react';
import { Trash2, Crown } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import {FaUsers } from "react-icons/fa";
const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    
    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await axiosSecure.get('/users');
            return response.data;
        }
    });

    const handleMakeAdmin = async (user) => {
        try {
            const res = await axiosSecure.patch(`/users/admin/${user._id}`)
            .then(response => {
                console.log(response.data)
                if (response.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Success!",
                        text: `${user.name} is now an admin.`,
                        icon: "success",
                        confirmButtonText: "OK"
                    });
                } 
                
            })
            
        } catch (error) {
            console.error('Error making admin:', error);
            Swal.fire({
                title: "Error!",
                text: "Failed to update user role",
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    };

    const handleDeleteUser = async (user) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            });

            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/users/${user._id}`);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "User has been deleted.",
                        icon: "success",
                        confirmButtonText: "OK"
                    });
                }
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            Swal.fire({
                title: "Error!",
                text: "Failed to delete user",
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header with question */}
            <div className="text-center mb-8">
                <p className="text-orange-400 text-sm mb-2">---How many??---</p>
                <h1 className="text-3xl font-bold text-gray-800">MANAGE ALL USERS</h1>
            </div>

            {/* Total Users Counter */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6 max-w-4xl mx-auto">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                    TOTAL USERS: {users.length}
                </h2>

                {/* Table Header */}
                <div className="bg-orange-300 rounded-t-lg">
                    <div className="grid grid-cols-6 gap-4 p-4 text-white font-semibold">
                        <div className="text-center">No.</div>
                        <div className="text-center">NAME</div>
                        <div className="text-center">EMAIL</div>
                        <div className="text-center">ROLE</div>
                        <div className="text-center">MAKE ADMIN</div>
                        <div className="text-center">DELETE</div>
                    </div>
                </div>

                {/* Table Body */}
                <div className="bg-white border-l border-r border-b rounded-b-lg">
                    {users.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            No users found!!
                        </div>
                    ) : (
                        users.map((user, index) => (
                            <div key={user._id} className="grid grid-cols-6 gap-4 p-4 border-b border-gray-100 items-center">
                                <div className="text-center font-medium">{index + 1}</div>
                                <div className="text-center font-medium">{user.name}</div>
                                <div className="text-center text-gray-600">{user.email}</div>
                                <div className="text-center">
                                    <FaUsers size={20} className="inline-block mr-1" />
                                </div>
                                <div className="flex justify-center">
                                    {
                                        user.role === 'admin' ? 'Admin':
                                        <button
                                        onClick={() => handleMakeAdmin(user)}
                                        className="bg-orange-400 hover:bg-orange-500 text-white p-2 rounded transition-colors"
                                        title={user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                                    >
                                        <Crown size={16} />
                                    </button>
                                    }
                                </div>
                                <div className="flex justify-center">
                                    <button
                                        onClick={() => handleDeleteUser(user)}
                                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded transition-colors"
                                        title="Delete User"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllUsers;