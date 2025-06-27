import React from "react";
import { Trash2 } from "lucide-react";
import useCart from "../../../Hook/useCart";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import "./Cart.css";

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
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${id}`)
        .then((response) => {
          if (response.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="cart-container">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-orange-500 text-sm italic mb-4">---My Cart---</p>
          <h1 className="text-4xl font-bold text-gray-800 tracking-wide">WANNA ADD MORE?</h1>
        </div>

        {/* Summary Cards */}
        <div className="summary-section">
          <div className="summary-card">
            <h3>{cart?.length || 0}</h3>
            <p>Total Items</p>
          </div>
          <div className="summary-card">
            <h3>${totalPrice}</h3>
            <p>Total Price</p>
          </div>
          <div className="summary-card">
            <Link to="/dashboard/payment" className="pay-btn">
              Proceed to Pay
            </Link>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="cart-card p-8">
          {/* Table */}
          <div className="cart-table-container overflow-x-auto">
            <table className="cart-table">
              {/* Table Header */}
              <thead>
                <tr>
                  <th className="text-center">#</th>
                  <th>Item Image</th>
                  <th>Item Name</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              
              {/* Table Body */}
              <tbody>
                {cart?.length > 0 ? (
                  cart.map((item, index) => (
                    <tr key={item._id} className={`cart-item-enter ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`} style={{ animationDelay: `${index * 0.1}s` }}>
                      <td className="index-cell">{index + 1}</td>
                      <td className="item-image-cell">
                        <img src={item.image} alt={item.name} className="item-image" />
                      </td>
                      <td className="item-name-cell">{item.name}</td>
                      <td className="price-cell">${parseFloat(item.price).toFixed(2)}</td>
                      <td className="action-cell">
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="delete-btn"
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="empty-cart">
                      <div className="empty-cart-icon">🛒</div>
                      <h3>Your cart is empty</h3>
                      <p>Add some delicious items to get started!</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
