import React from "react";
import "./Review.css";

const Review = ({ review }) => {
  return (
    <div className="px-8 py-2 box-border flex flex-col items-start justify-center w-[550px] bg-blue-500/15 rounded-md h-[130px]">
      <h1 className="font-bold text-2xl">{review.reviewText}</h1>
      <h2 className="text-xl font-semibold flex items-center gap-1">
        {review.rating}
        <i className="fa fa-star text-yellow-500" aria-hidden="true"></i>
      </h2>
      <h3 className="text-base font-semibold">~ {review.user}</h3>
    </div>
  );
};

export default Review;
