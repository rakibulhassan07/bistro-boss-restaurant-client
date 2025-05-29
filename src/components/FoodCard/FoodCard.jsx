import React, { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useCart from "../../Hook/useCart";

const FoodCard = ({ item }) => {
  const { image, recipe, name, price,_id } = item;
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const axiosSecure =useAxiosSecure()
  const navigate = useNavigate();
  const [, refatch] = useCart();
  const handleAddToCart = () => {
    if (user && user.email) {
       const cartItem={
        menuId:_id,
        email:user.email,
        name,
        image,
        price,
       } 
       axiosSecure.post("/carts", cartItem) 
       .then((response) => {
        console.log(response.data);
        if(response.data.insertedId) {
          Swal.fire({
            title: "Added to Cart",
            text: `${name} has been added to your cart.`,
            icon: "success",
            confirmButtonText: "OK",
          });
          refatch();
        }
       })
      //add to cart logic
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
           navigate("/login", {state: { from:location  } });
        }
      });
     
    }
  };
  return (
    <div className="card w-96 bg-base-100 shadow-md">
      <figure className="relative">
        <img
          src={image}
          alt="Caeser Salad"
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-black text-white text-sm px-2 py-1 rounded">
          ${price}
        </div>
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-lg font-semibold">{name}</h2>
        <p className="text-sm text-gray-600">{recipe}</p>
        <div className="card-actions mt-4">
          <button
            onClick={handleAddToCart}
            className="btn btn-outline btn-warning w-full"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
