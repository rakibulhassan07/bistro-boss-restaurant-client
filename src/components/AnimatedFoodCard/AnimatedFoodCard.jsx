import React, { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useCart from "../../Hook/useCart";
import './AnimatedFoodCard.css';

const AnimatedFoodCard = ({ item }) => {
  const { image, recipe, name, price, _id } = item;
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [, refatch] = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = async () => {
    if (user && user.email) {
      setIsLoading(true);
      const cartItem = {
        menuId: _id,
        email: user.email,
        name,
        image,
        price,
      };

      try {
        const response = await axiosSecure.post("/carts", cartItem);
        if (response.data.insertedId) {
          setIsAdded(true);
          Swal.fire({
            title: "Added to Cart!",
            text: `${name} has been added to your cart.`,
            icon: "success",
            confirmButtonText: "OK",
            timer: 2000,
            timerProgressBar: true,
          });
          refatch();
          
          // Reset the added state after animation
          setTimeout(() => setIsAdded(false), 3000);
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to add item to cart. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      Swal.fire({
        title: "You are not logged in!",
        text: "Please log in to add items to your cart.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, log in!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className={`animated-food-card ${isAdded ? 'added-to-cart' : ''}`}>
      <div className="card-container">
        <div className="image-container">
          <img src={image} alt={name} className="food-image" />
          <div className="price-tag">
            <span className="currency">$</span>
            <span className="amount">{price}</span>
          </div>
        </div>
        
        <div className="card-content">
          <h3 className="food-name">{name}</h3>
          <p className="food-recipe">{recipe}</p>
          
          <div className="card-actions">
            <button
              onClick={handleAddToCart}
              disabled={isLoading}
              className={`add-to-cart-btn ${isLoading ? 'loading' : ''} ${isAdded ? 'added' : ''}`}
            >
              <span className="btn-content">
                {isLoading ? (
                  <>
                    <div className="spinner"></div>
                    <span>Adding...</span>
                  </>
                ) : isAdded ? (
                  <>
                    <span className="success-icon">✓</span>
                    <span>Added!</span>
                  </>
                ) : (
                  <>
                    <span className="cart-icon">🛒</span>
                    <span>ADD TO CART</span>
                  </>
                )}
              </span>
              <div className="btn-background"></div>
            </button>
          </div>
        </div>
        
        <div className="floating-elements">
          <div className="floating-element star">⭐</div>
          <div className="floating-element heart">❤️</div>
          <div className="floating-element sparkle">✨</div>
        </div>
        
        <div className="success-animation">
          <div className="success-circle">
            <span className="checkmark">✓</span>
          </div>
          <div className="success-text">Added to Cart!</div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedFoodCard;
