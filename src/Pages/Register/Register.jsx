import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../provider/AuthProvider";
import img from "../../assets/others/authentication1.png";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        updateUserProfile(data.name, data.photoUrl)
          .then(() => {
            console.log("User profile updated:", user);

            // Trigger success toast
            toast.success("User Created Successfully!", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });

            reset(); // Clear the form
            setTimeout(() => navigate("/"), 2000); // Navigate after 2 seconds
          })
          .catch((error) => {
            console.error("Error updating user profile:", error);
            toast.error(`Profile update failed: ${error.message}`, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          });
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        toast.error(`User creation failed: ${error.message}`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };

  return (
    <>
      <Helmet>
        <title>THE PIZZA GARDEN | Register</title>
      </Helmet>
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
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: true })}
                    placeholder="Type here"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      Name is required.
                    </p>
                  )}
                </div>
                {/* Photo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Photo URL
                  </label>
                  <input
                    type="text"
                    {...register("photoUrl", { required: true })}
                    placeholder="Photo URL"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  />
                  {errors.photoUrl && (
                    <p className="text-red-500 text-sm mt-1">
                      Photo URL is required.
                    </p>
                  )}
                </div>
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    placeholder="Type here"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      Valid email is required.
                    </p>
                  )}
                </div>
                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    {...register("password", { required: true, minLength: 6 })}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      Password must be at least 6 characters long.
                    </p>
                  )}
                </div>
                {/* Submit Button */}
                <input
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                  type="submit"
                  value="Sign Up"
                />
              </form>
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
