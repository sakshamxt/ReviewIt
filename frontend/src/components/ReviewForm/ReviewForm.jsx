import React from "react";
import "./ReviewForm.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { usePostReviewMutation } from "../../slices/movieApiSlice";

const ReviewForm = ({ movieId, onReviewSubmit }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("");
  const [postReview] = usePostReviewMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reviewData = {
        user: userInfo.name,
        reviewText: reviewText,
        rating: rating,
      };

      const res = await postReview({ id: movieId, data: reviewData }).unwrap();
      setReviewText("");
      setRating("");
      onReviewSubmit(res.data);
    } catch (error) {
      console.error("Error creating review", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col mt-6 items-center justify-center h-full">
        <div className="">
          <form className="flex items-center gap-2" onSubmit={handleSubmit}>
            <select onChange={(event) => setRating(event.target.value)} className="outline-none focus:outline-none focus:ring-2 focus:ring-gray-300 border-none px-3 py-3 bg-gray-200 rounded-md">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <input
              type="text"
              className="text-base w-96 h-12 px-4 py-3 rounded-md border-none bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
              placeholder="Write Your Review"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
            <button
              type="submit"
              className="uppercase text-base hover:scale-[1.03] transition-all hover:bg-blue-800 bg-blue-700 text-white h-12 font-semibold px-3 rounded-md"
            >
              POST
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
