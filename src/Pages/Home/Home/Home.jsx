import React, { useState, useEffect } from "react";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import PopularMenu from "../PopularMenu/PopularMenu";
import Featured from "../Featured/Featured";
import Testimonials from "../Testimonials/Testimonials";
import { Helmet } from "react-helmet-async";
import { ChefHat, Star, Award, Users, Clock, Heart } from "lucide-react";
const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { icon: Users, number: "1000+", label: "Happy Customers", color: "from-blue-500 to-cyan-500" },
    { icon: ChefHat, number: "50+", label: "Expert Chefs", color: "from-orange-500 to-red-500" },
    { icon: Award, number: "25+", label: "Awards Won", color: "from-purple-500 to-pink-500" },
    { icon: Clock, number: "24/7", label: "Service", color: "from-green-500 to-emerald-500" }
  ];

  return (
    <div className="relative min-h-screen">
      <Helmet>
        <title>BISTRO BOSS | Premium Dining Experience</title>
      </Helmet>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-yellow-200/20 to-orange-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-pink-200/20 to-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-green-200/20 to-teal-300/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-br from-blue-200/20 to-indigo-300/20 rounded-full blur-3xl animate-pulse delay-3000"></div>
      </div>

      {/* Premium Hero Section */}
      <div className="relative z-[1]">
        <div 
          className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        >
          <Banner />
        </div>

        {/* Floating Stats Cards */}
        <div className={`relative -mt-20 z-[2] transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className={`bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/50 text-center transform transition-all duration-500 hover:scale-105 hover:shadow-3xl group`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 transform transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 shadow-lg`}>
                    <stat.icon className="w-8 h-8 text-white drop-shadow-lg" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.number}</h3>
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                  <div className={`w-12 h-1 bg-gradient-to-r ${stat.color} mx-auto mt-2 rounded-full transform transition-all duration-300 group-hover:w-16`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Premium Content Sections */}
      <div className="relative z-[1] bg-gradient-to-br from-slate-50 via-white to-slate-100">
        {/* Enhanced Category Section */}
        <div className={`transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'} py-20`}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Star className="w-8 h-8 text-yellow-500 animate-pulse" />
                <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 bg-clip-text text-transparent">
                  Explore Our Categories
                </h2>
                <Star className="w-8 h-8 text-yellow-500 animate-pulse delay-500" />
              </div>
              <p className="text-xl text-gray-600 font-medium">
                ~ Discover Culinary Excellence in Every Bite ~
              </p>
              <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 mx-auto mt-4 rounded-full"></div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
              <Category />
            </div>
          </div>
        </div>

        {/* Enhanced Popular Menu Section */}
        <div className={`transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'} py-20`}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Heart className="w-8 h-8 text-red-500 animate-pulse" />
                <h2 className="text-5xl font-bold bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                  Popular Selections
                </h2>
                <Heart className="w-8 h-8 text-red-500 animate-pulse delay-500" />
              </div>
              <p className="text-xl text-gray-600 font-medium">
                ~ Customer Favorites & Chef's Recommendations ~
              </p>
              <div className="w-32 h-1 bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 mx-auto mt-4 rounded-full"></div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
              <PopularMenu />
            </div>
          </div>
        </div>

        {/* Enhanced Featured Section */}
        <div className={`transform transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'} py-20`}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Award className="w-8 h-8 text-purple-500 animate-pulse" />
                <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
                  Featured Experience
                </h2>
                <Award className="w-8 h-8 text-purple-500 animate-pulse delay-500" />
              </div>
              <p className="text-xl text-gray-600 font-medium">
                ~ Signature Dishes & Special Occasions ~
              </p>
              <div className="w-32 h-1 bg-gradient-to-r from-purple-400 via-blue-500 to-indigo-500 mx-auto mt-4 rounded-full"></div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 overflow-hidden">
              <Featured />
            </div>
          </div>
        </div>

        {/* Enhanced Testimonials Section */}
        <div className={`transform transition-all duration-1000 delay-1100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'} py-20 pb-32`}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Users className="w-8 h-8 text-green-500 animate-pulse" />
                <h2 className="text-5xl font-bold bg-gradient-to-r from-green-600 via-teal-500 to-cyan-600 bg-clip-text text-transparent">
                  Customer Stories
                </h2>
                <Users className="w-8 h-8 text-green-500 animate-pulse delay-500" />
              </div>
              <p className="text-xl text-gray-600 font-medium">
                ~ What Our Guests Say About Their Experience ~
              </p>
              <div className="w-32 h-1 bg-gradient-to-r from-green-400 via-teal-500 to-cyan-500 mx-auto mt-4 rounded-full"></div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
              <Testimonials />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-[40]">
        <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-full shadow-2xl transform transition-all duration-300 hover:scale-110 hover:rotate-12 animate-bounce">
          <ChefHat className="w-6 h-6" />
        </button>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
};

export default Home;
