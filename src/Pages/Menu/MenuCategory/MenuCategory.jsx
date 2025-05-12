import React from "react";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import Cover from "../../Shared/Cover/Cover";
import { Link } from "react-router-dom";

const MenuCategory = ({items,title,img}) => {
  return (
    <div className="pt-4 md:pt-8">
        {title && <Cover img={img} title={title}></Cover>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6 my-8 md:my-16 px-4 md:px-8">
        {items.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      <div className="text-center mb-8">
        <Link to={`/order/${title}`}>
          <button className="uppercase border-b-4 btn btn-outline border-0 transition px-4 py-2 text-sm md:text-base hover:bg-yellow-600 hover:text-white">
            Order now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MenuCategory;
