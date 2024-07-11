import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdRateReview } from "react-icons/md";
import "./SingleMovie.css";
import Reviews from "../../components/Reviews/Reviews";
import Footer from "../../components/Footer/Footer";
import ReviewForm from "../../components/ReviewForm/ReviewForm";
import { useGetOneMovieMutation } from "../../slices/movieApiSlice";

const SingleMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const [isShown, setIsShown] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [getOneMovie] = useGetOneMovieMutation();

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const res = await getOneMovie({ id: id });
        setMovie(res.data);
        setReviews(res.data.reviews || []);
      } catch (error) {
        console.error("Error getting movie data", error);
      }
    };
    fetchMovieData();
  }, [getOneMovie, id, submittingReview]);

  const handleNewReview = (newReview) => {
    setReviews([...reviews, newReview]);
    setSubmittingReview(true);
  };

  const handleClick = (event) => {
    setIsShown((current) => !current);
  };
  return (
    <>
      <div className="flex flex-col items-center mt-20">
        <div className="h-[400px] w-[900px] px-8 items-center flex justify-between bg-white/30 rounded-lg shadow-md shadow-gray-700 py-5">
          <div class="flex flex-col gap-3 mt-16 px-10 relative h-full">
            <h1 className="font-bold text-4xl">{movie.name}</h1>
            <span className="text-2xl font-semibold flex items-center gap-1">
              {movie.rating}
              <i className="fa fa-star text-yellow-500" aria-hidden="true"></i>
            </span>

            <p class="movie-desc">{movie.description}</p>

            {userInfo ? (
              <div className="mt-8">
                <button className="bg-blue-700 hover:scale-[1.03] transition-all hover:bg-blue-800 rounded-md text-white font-semibold px-4 py-3" onClick={handleClick}>
                  <span className="flex items-center gap-2"><MdRateReview/>REVIEW IT</span>
                </button>
              </div>
            ) : (
              <div class="mt-8">
                    <Link className="link bg-blue-700 hover:scale-[1.03] transition-all hover:bg-blue-800 rounded-md text-white font-semibold px-4 py-3" to="/login">
                      LOGIN
                    </Link>
              </div>
            )}
          </div>

          <div className="h-full w-[25rem] rounded-md bg-cover">
            <img className="w-full rounded-md h-full object-cover" src={movie.image_url} alt="img" />
          </div>
        </div>
      </div>
      {isShown && (
        <ReviewForm
          movieId={id}
          onReviewSubmit={(newReview) => handleNewReview(newReview)}
        />
      )}
      <Reviews reviews={movie.reviews} />
      <Footer />
    </>
  );
};

export default SingleMovie;
