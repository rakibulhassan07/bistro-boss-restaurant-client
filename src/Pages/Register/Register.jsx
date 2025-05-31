import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GiCroissant, GiSlicedBread } from "react-icons/gi";
import { FaEye, FaEyeSlash, FaBreadSlice, FaCookieBite, FaCloudUploadAlt } from "react-icons/fa";
import { MdOutlineBakeryDining } from "react-icons/md";
import { TbFidgetSpinner } from "react-icons/tb";
import { BsPersonFill } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../provider/AuthProvider";
import img from "../../assets/others/authentication1.png";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import Swal from "sweetalert2";
import SocialLoginButton from "../../components/SocialLoginButton/SocialLoginButton";

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUserProfile, setUser, googleSignIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageName, setImageName] = useState("No file chosen");
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const showPass = () => setVisible((prev) => !prev);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();
  
  // Image upload with imagebb api
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    setImageName(file.name);
    
    // Preview image
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
    
    const formData = new FormData();
    formData.append("image", file);
    
    const url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMGBB_API_KEY
    }`;

    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setImageUrl(data.data.url);
        Swal.fire({
          title: "Success!",
          text: "Image uploaded successfully!",
          icon: "success",
          confirmButtonText: "OK"
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to upload image",
          icon: "error",
          confirmButtonText: "OK"
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const onsubmit = async (data) => {
    try {
      setLoading(true);
      const result = await createUser(data.email, data.password);
      const user = result.user;
      
      // Update user profile
      await updateUserProfile(data.name, imageUrl);
      
      // Update user state with new profile data
      setUser({
        ...user,
        displayName: data.name,
        photoURL: imageUrl
      });

      // Save user to database
      const saveUser = {
        name: data.name,
        photo: imageUrl,
        email: data.email,
        phone: data.phone,
        password: data.password,
        role: "customer",
      };

      const res = await axiosPublic.post("/users", saveUser);
      
      if (res.data.insertedId) {
        reset();
        Swal.fire({
          title: "Success!",
          text: "User Created Successfully",
          icon: "success",
          confirmButtonText: "OK"
        });

        setTimeout(() => {
          const redirectPath = location.state?.from?.pathname || "/";
          navigate(redirectPath, { replace: true });
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      if (error.code === 'auth/email-already-in-use') {
        Swal.fire({
          title: "Email Already Exists!",
          text: "This email is already registered. Please use a different email ",
          icon: "warning",
          confirmButtonText: "OK"
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: error.message || "Registration failed. Please try again.",
          icon: "error",
          confirmButtonText: "OK"
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Sign In
 

  return (
    <>
      <ToastContainer />
      <div
        className="min-h-screen bg-gray-50 flex items-center justify-center p-4"
        style={{ backgroundImage: "url(/pattern.svg)" }}
      >
        <div className="mt-14 bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full flex">
          <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Sign Up
              </h2>
              <form onSubmit={handleSubmit(onsubmit)} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: true })}
                    placeholder="Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      Name is required.
                    </p>
                  )}
                </div>

                {/* Photo*/}
                <div className="form-control mt-4">
                  <label className="label">
                    <span className="block text-sm font-medium text-gray-700 mb-2">
                      Profile Image
                    </span>
                  </label>
                  <div className="flex flex-col space-y-2">
                    {/* Image preview */}
                    {imagePreview && (
                      <div className="w-full flex justify-center mb-2">
                        <img 
                          src={imagePreview} 
                          alt="Profile preview" 
                          className="h-24 w-24 object-cover rounded-full border-2 border-orange-300"
                        />
                      </div>
                    )}
                    
                    {/* File upload UI */}
                    <div className="flex items-center">
                      <label className="flex-1 flex items-center justify-center p-2 bg-orange-50 border border-orange-300 border-dashed rounded-l-md hover:bg-orange-100 cursor-pointer transition-colors">
                        <FaCloudUploadAlt className="mr-2 text-orange-600 text-xl" />
                        <span className="text-orange-700">Choose file</span>
                        <input 
                          type="file" 
                          name="profileImage" 
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </label>
                      <div className="bg-orange-50 border border-orange-300 border-l-0 rounded-r-md p-2 text-orange-700 text-sm overflow-hidden whitespace-nowrap text-ellipsis max-w-[200px]">
                        {imageName}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    placeholder="abc@Gmail.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      Valid email is required.
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    {...register("phone", { required: true })}
                    placeholder="+880 "
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      Phone number is required.
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={visible ? "text" : "password"}
                      {...register("password", { required: true })}
                      placeholder="Enter your password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all pr-12"
                    />
                    <button
                      type="button"
                      onClick={showPass}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-800 focus:outline-none"
                    >
                      {visible ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      Password is required.
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <TbFidgetSpinner className="animate-spin h-5 w-5" />
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              {/* Google Sign In Button */}
             <SocialLoginButton />

              <p className="text-center mt-4">
                <span className="text-sm text-gray-600">
                  Already registered?{" "}
                </span>
                <Link
                  to="/login"
                  className="text-yellow-700 font-semibold hover:underline"
                >
                  Go to log in
                </Link>
              </p>
            </div>
          </div>
          <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8">
            <img
              src={img}
              alt="Sign up illustration"
              className="max-w-xs w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;