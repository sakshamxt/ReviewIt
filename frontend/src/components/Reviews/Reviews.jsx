import React from "react";
import "./Reviews.css";
import Review from "../Review/Review";

const Reviews = ({ reviews }) => {
  return (
    <>
      {Array.isArray(reviews) && reviews.length > 0 ? (
        <div className="flex flex-col gap-4 items-center justify-center mt-10">
          {reviews.map((review) => (
            <Review key={review._id} review={review} />
          ))}
        </div>
      ) : (
        <p className="flex items-center justify-center mt-16 font-bold text-3xl">No reviews</p>
      )}
    </>
  );
};

export default Reviews;
