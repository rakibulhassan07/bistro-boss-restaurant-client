import React from "react";
import FoodCard from "../../../components/FoodCard/FoodCard";
import { Swiper, SwiperSlide } from "swiper/react";

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
          paddingBottom: "60px", // Add space for pagination
        }}
      >
        {slides.map((slideItems, index) => (
          <SwiperSlide key={index}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
              {slideItems.map((item) => (
                <FoodCard key={item._id} item={item}></FoodCard>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default OrderTab;
