import React, { useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../../provider/AuthProvider';
import useAxiosPublic from '../../Hook/useAxiosPublic';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SocialLoginButton = () => {
    const { googleSignIn } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((result) => {
                const userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email,
                    photo: result.user?.photoURL,
                    role: 'customer'
                }
                axiosPublic.post('/users', userInfo)
                    .then((response) => {
                        if (response.data.insertedId) {
                            // User successfully signed in and data saved
                            Swal.fire({
                                title: "Success!",
                                text: "Login Successful",
                                icon: "success",
                                confirmButtonText: "OK"
                            });
                            

                            setTimeout(() => {
                                navigate('/');
                            }, 2000);
                        } else {
                            // User already exists, show success message and navigate
                            Swal.fire({
                                title: "Welcome Back!",
                                text: "Login Successful",
                                icon: "success",
                                confirmButtonText: "OK"
                            });
                            

                            setTimeout(() => {
                                navigate('/');
                            }, 2000);
                        }
                    })
                    .catch((error) => {
                        console.error('Database error:', error);
                        Swal.fire({
                            title: "Error!",
                            text: "Failed to save user data. Please try again.",
                            icon: "error",
                            confirmButtonText: "OK"
                        });
                    });
            })
            .catch((error) => {
                // Handle sign-in errors
                console.error('Google Sign-In error:', error);
                if (error.code === 'auth/email-already-in-use') {
                    Swal.fire({
                        title: "Email Already Exists!",
                        text: "This email is already registered. Please use a different email or try logging in.",
                        icon: "warning",
                        confirmButtonText: "OK"
                    });
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: "Google sign in failed. Please try again.",
                        icon: "error",
                        confirmButtonText: "OK"
                    });
                }
            });
    }   
    return (
        <div>
            <div className="flex justify-center space-x-4">
                <button 
                    onClick={handleGoogleSignIn} 
                    className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                    <FcGoogle size={20} />
                </button>
            </div>
        </div>
    );
};

export default SocialLoginButton;