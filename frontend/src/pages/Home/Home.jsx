import React from "react";
import { useState, useEffect } from "react";
import Movies from "../../components/Movies/Movies";
import Footer from "../../components/Footer/Footer";
import { useGetAllMoviesMutation } from "../../slices/movieApiSlice";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [getAllMovies] = useGetAllMoviesMutation();
  

  useEffect(() => {
    // Function to fetch all movies from your backend API
    const fetchMovies = async () => {
      try {
        const response = await getAllMovies(); // Replace with your API endpoint URL
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    // Call the fetchMovies function to retrieve the movies
    fetchMovies();
  }, [getAllMovies]);
  return (
    <>
      <div className="home">
        <div className="px-28 mt-8 py-3 flex items-center">
          <input
            className="w-96 h-full outline-none border-[2px] border-gray-300 focus:border-gray-400 rounded-tl-md rounded-bl-md border-r-none px-4 py-2"
            type="text"
            placeholder="Search"
          />
          <button
            className="bg-blue-700 text-sm hover:scale-[1.03] rounded-tr-md rounded-br-md rounded-none transition-all hover:bg-blue-800 text-white font-semibold px-4 py-2"
            type="submit"
          >
            Search
          </button>
        </div>
        {/* <Hero /> */}
        <Movies movies={movies} />
        <Footer />
      </div>
    </>
  );
};

export default Home;
