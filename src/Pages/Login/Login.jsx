import React, { useContext, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import img from "../../assets/others/authentication1.png";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; //this is used to redirect the user after login

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then(() => {
        toast.success("Login Successful!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => navigate(from, { replace: true }), 2000); // Allow toast to show before navigating
        form.reset();
      })
      .catch((error) => {
        console.error("Login error:", error);
        toast.error("Login Failed. Please check your credentials.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Helmet>
        <title>THE PIZZA GARDEN | LogIn</title>
      </Helmet>
      <ToastContainer />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="mt-14 bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full flex">
          <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8">
            <img src={img} alt="Authentication Illustration" />
          </div>
          <div className="w-full lg:w-1/2 p-8 lg:p-12">
            <div className="max-w-md mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Login
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="abc@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  Sign in
                </button>
              </form>
              <p className="text-center mt-4">
                <span className="text-sm text-gray-600">New here? </span>
                <Link to="/register" className="text-orange-500 hover:underline">
                  Create a New Account
                </Link>
              </p>
              <div className="mt-8">
                <p className="text-center text-gray-600 mb-4">
                  Or sign in with
                </p>
                <div className="flex justify-center space-x-4">
                  <button className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <FcGoogle size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
