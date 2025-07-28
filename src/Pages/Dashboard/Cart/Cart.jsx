import React from "react";
import { Trash2, ShoppingCart, DollarSign, CreditCard } from "lucide-react";
import useCart from "../../../Hook/useCart";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Cart = () => {
  // Sample cart data - replace with your actual cart data
  const [cart, refetch] = useCart();
  const totalPrice = cart
    .reduce((total, item) => total + item.price, 0)
    .toFixed(2);
  const axiosSecure = useAxiosSecure();
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ea580c",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      background: '#1e293b',
      color: '#ffffff'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${id}`)
        .then((response) => {
          if (response.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Item has been removed from your cart.",
              icon: "success",
              confirmButtonColor: "#ea580c",
              background: '#1e293b',
              color: '#ffffff'
            });
          }
        });
      }
    });
  };

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      fontFamily: '"Inter", sans-serif'
    }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div style={{
          backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="%23ffffff" opacity="0.3"/><circle cx="75" cy="25" r="1" fill="%23ffffff" opacity="0.2"/><circle cx="50" cy="50" r="1" fill="%23ffffff" opacity="0.4"/><circle cx="25" cy="75" r="1" fill="%23ffffff" opacity="0.3"/><circle cx="75" cy="75" r="1" fill="%23ffffff" opacity="0.2"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>')`,
          backgroundRepeat: 'repeat',
          width: '100%',
          height: '100%'
        }} />
      </div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 via-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-xl">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-300 to-amber-100">
                My Cart
              </h1>
            </div>
          </div>
          <p className="text-amber-300 text-sm font-medium tracking-wide">
            BISTRO BOSS RESTAURANT • YOUR SELECTED ITEMS
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-6xl mx-auto">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <ShoppingCart className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white">{cart?.length || 0}</h3>
                <p className="text-white/70 font-medium">Total Items</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <DollarSign className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white">${totalPrice}</h3>
                <p className="text-white/70 font-medium">Total Price</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <CreditCard className="w-7 h-7 text-white" />
              </div>
              <div>
                <Link 
                  to="/dashboard/payment" 
                  className="inline-block px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                  style={{ 
                    background: 'linear-gradient(135deg, #ea580c 0%, #dc2626 100%)',
                    boxShadow: '0 8px 32px rgba(234, 88, 12, 0.3)'
                  }}
                >
                  Proceed to Pay
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Cart Items Table */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden shadow-2xl max-w-7xl mx-auto">
          <div className="p-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-4 px-6 text-amber-300 font-semibold">#</th>
                    <th className="text-left py-4 px-6 text-amber-300 font-semibold">Item Image</th>
                    <th className="text-left py-4 px-6 text-amber-300 font-semibold">Item Name</th>
                    <th className="text-left py-4 px-6 text-amber-300 font-semibold">Price</th>
                    <th className="text-left py-4 px-6 text-amber-300 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart?.length > 0 ? (
                    cart.map((item, index) => (
                      <tr key={item._id} className="border-b border-white/10 hover:bg-white/5 transition-all duration-200">
                        <td className="py-4 px-6">
                          <span className="w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {index + 1}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg border-2 border-white/20">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-white font-semibold text-lg">{item.name}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-green-400 font-bold text-xl">
                            ${parseFloat(item.price).toFixed(2)}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-110 shadow-lg"
                            title="Remove item"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-12">
                        <div className="flex flex-col items-center">
                          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mb-4 shadow-xl">
                            <ShoppingCart className="w-10 h-10 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2">Your cart is empty</h3>
                          <p className="text-white/70">Add some delicious items to get started!</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
