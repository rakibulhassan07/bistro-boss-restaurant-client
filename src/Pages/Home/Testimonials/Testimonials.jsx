import React, { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Rating } from "@smastrom/react-rating";


import '@smastrom/react-rating/style.css'
const Testimonials = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("reviews.json")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
  }, []);

  return (
    <div className="my-20">
      <SectionTitle
        subHeading={"---What Our Clients Say---"}
        heading={"TESTIMONIALS"}
      />

      <div className="max-w-4xl mx-auto px-4">
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <div className="flex flex-col items-center text-center px-16 py-8">
                {/* Star Rating */}
                <div className="flex mb-6">
                  <Rating style={{ maxWidth: 180 }} value={review.rating} readOnly />
                </div>

                {/* Quote Symbol */}
                <div className="text-6xl font-bold text-black mb-6">❝</div>

                {/* Testimonial Text */}
                <p className="text-gray-600 mb-4">{review.details}</p>

                {/* Author Name */}
                <h2 className="text-xl font-medium text-yellow-600 uppercase mt-4">
                  {review.name}
                </h2>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
