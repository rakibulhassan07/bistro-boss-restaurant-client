import React from "react";
import FoodCard from "../../../components/FoodCard/FoodCard";
import AnimatedFoodCard from "../../../components/AnimatedFoodCard/AnimatedFoodCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "./OrderTab.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const OrderTab = ({ title }) => {
  // Calculate number of slides needed (6 items per slide)
  const itemsPerSlide = 6;
  const totalSlides = Math.ceil(title.length / itemsPerSlide);

  // Create array of slides
  const slides = Array.from({ length: totalSlides }, (_, index) => {
    const start = index * itemsPerSlide;
    const end = start + itemsPerSlide;
    return title.slice(start, end);
  });

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

  return (
    <div className="py-8">
      <Swiper
        pagination={pagination}
        modules={[Pagination]}
        className="mySwiper"
        spaceBetween={30}
        style={{
          paddingBottom: "60px", // Add space for pagination pages 
  
        }}
      >
        {slides.map((slideItems, index) => (
          <SwiperSlide key={index}> 
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
              {slideItems.map((item, index) => (
                <div 
                  key={item._id} 
                  className="animated-card-wrapper"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <AnimatedFoodCard item={item} />
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default OrderTab;
