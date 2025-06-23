import React from 'react';
import { Trash2, Crown, UserCheck, Users } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

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
            {/* Header */}
            <div className="text-center mb-8">
                <p className="text-orange-400 text-sm mb-2">---How many??---</p>
                <h1 className="text-3xl font-bold text-gray-800">MANAGE ALL USERS</h1>
            </div>

            {/* Stats Card */}
            <div className="max-w-6xl mx-auto mb-6">
                <div className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <Users size={32} />
                            <div>
                                <h2 className="text-2xl font-bold">Total Users</h2>
                                <p className="text-orange-100">Registered members</p>
                            </div>
                        </div>
                        <div className="text-4xl font-bold">
                            {users.length}
                        </div>
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Table Header */}
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600">
                        <div className="grid grid-cols-12 gap-4 px-6 py-4 text-white font-semibold">
                            <div className="col-span-1 text-center">
                                <span className="text-sm">NO.</span>
                            </div>
                            <div className="col-span-3 text-left">
                                <span className="text-sm">NAME</span>
                            </div>
                            <div className="col-span-4 text-left">
                                <span className="text-sm">EMAIL</span>
                            </div>
                            <div className="col-span-2 text-center">
                                <span className="text-sm">ROLE</span>
                            </div>
                            <div className="col-span-1 text-center">
                                <span className="text-sm">ADMIN</span>
                            </div>
                            <div className="col-span-1 text-center">
                                <span className="text-sm">DELETE</span>
                            </div>
                        </div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-gray-200">
                        {users.length === 0 ? (
                            <div className="px-6 py-12 text-center">
                                <Users size={48} className="mx-auto text-gray-400 mb-4" />
                                <p className="text-gray-500 text-lg">No users found!</p>
                                <p className="text-gray-400 text-sm">Users will appear here once they register.</p>
                            </div>
                        ) : (
                            users.map((user, index) => (
                                <div 
                                    key={user._id} 
                                    className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors items-center"
                                >
                                    {/* Serial Number */}
                                    <div className="col-span-1 text-center">
                                        <span className="inline-flex items-center justify-center w-8 h-8 bg-orange-100 text-orange-800 rounded-full font-semibold text-sm">
                                            {index + 1}
                                        </span>
                                    </div>

                                    {/* Name */}
                                    <div className="col-span-3">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                                                {user.name?.charAt(0)?.toUpperCase() || 'U'}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{user.name}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="col-span-4">
                                        <p className="text-gray-600 truncate" title={user.email}>
                                            {user.email}
                                        </p>
                                    </div>

                                    {/* Role Status */}
                                    <div className="col-span-2 text-center">
                                        {user.role === 'admin' ? (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                <Crown size={12} className="mr-1" />
                                                Admin
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                <UserCheck size={12} className="mr-1" />
                                                User
                                            </span>
                                        )}
                                    </div>

                                    {/* Make Admin Button */}
                                    <div className="col-span-1 text-center">
                                        {user.role === 'admin' ? (
                                            <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center">
                                                <Crown size={16} className="text-green-600" />
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => handleMakeAdmin(user)}
                                                className="w-9 h-9 bg-orange-100 hover:bg-orange-200 text-orange-600 hover:text-orange-700 rounded-lg transition-all duration-200 flex items-center justify-center group"
                                                title="Make Admin"
                                            >
                                                <Crown size={16} className="group-hover:scale-110 transition-transform" />
                                            </button>
                                        )}
                                    </div>

                                    {/* Delete Button */}
                                    <div className="col-span-1 text-center">
                                        <button
                                            onClick={() => handleDeleteUser(user)}
                                            className="w-9 h-9 bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 rounded-lg transition-all duration-200 flex items-center justify-center group"
                                            title="Delete User"
                                        >
                                            <Trash2 size={16} className="group-hover:scale-110 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Footer Stats */}
                {users.length > 0 && (
                    <div className="mt-4 bg-white rounded-lg shadow p-4">
                        <div className="flex justify-between items-center text-sm text-gray-600">
                            <span>
                                Showing {users.length} user{users.length !== 1 ? 's' : ''}
                            </span>
                            <div className="flex space-x-4">
                                <span>
                                    Admins: {users.filter(user => user.role === 'admin').length}
                                </span>
                                <span>
                                    Regular Users: {users.filter(user => user.role !== 'admin').length}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllUsers;