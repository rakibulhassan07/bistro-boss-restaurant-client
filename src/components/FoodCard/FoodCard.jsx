import React from "react";

const FoodCard = ({ item }) => {
  const { image, recipe, name, price } = item;
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
          <button className="btn btn-outline btn-warning w-full">
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
