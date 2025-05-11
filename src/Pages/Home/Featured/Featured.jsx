import React from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImage from "../../../assets/home/featured.jpg";
import './Featured.css'
const Featured = () => {
  return (
    <div className="featuredBack bg-fixed relative py-8 my-12">
      <SectionTitle
        subHeading={"---Check it out---"}
        heading={"FROM OUR MENU"}
      />
      <div style={{backgroundColor: 'rgba(0, 0, 0, 0.3)' }} className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-8 px-4">
        <div className="md:w-1/2">
          <img 
            src={featuredImage} 
            alt="Featured dish" 
            className="w-full rounded shadow-lg"
          />
        </div>
        <div className="md:w-1/2">
          <div className=" bg-opacity-90 text-white p-6 rounded">
            <h2 className="text-sm mb-2">March 20, 2023</h2>
            <h3 className="text-xl font-semibold mb-3">WHERE CAN I GET SOME?</h3>
            <p className="text-sm mb-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              voluptate facere, deserunt dolores maiores quod nobis quas
              quasi. Eaque repellat recusandae ad laudantium tempore
              consequatur consequuntur omnis ullam maxime tenetur.
            </p>
            <button className="uppercase border-b-4 btn btn-outline border-0 transition px-4 py-2">
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;