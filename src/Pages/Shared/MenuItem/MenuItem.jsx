import React from 'react';

const MenuItem = ({ item }) => {
  const { image, recipe, name, price } = item;
  return (
    <div className="flex space-x-2 items-start gap-4 py-4 border-b border-[#E8E8E8]">
   
      <div className="flex-shrink-0 w-16 h-16  overflow-hidden flex items-center justify-center">
        {image && (
          <img
          style={{borderRadius:'0 200px 200px 200px'}}
            src={image}
            alt={name}
            className="object-cover w-14 h-14"
          />
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="uppercase text-base font-semibold tracking-wide whitespace-nowrap">
            {name}
            <span className="inline-block align-middle w-24 border-t border-dashed border-gray-400 mx-2"></span>
          </h3>
          <span className="text-[#D99904] font-bold text-lg ml-2">${price}</span>
        </div>
        <p className="text-sm text-gray-500 mt-1">{recipe}</p>
      </div>
    </div>
  );
};

export default MenuItem;