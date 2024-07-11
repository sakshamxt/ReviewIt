import React from "react";
import Movie from "../Movie/Movie";

const Movies = ({ movies }) => {
  return (
    <>
      <div className="px-28 py-8 flex flex-wrap justify-center items-center">
        {movies.map((movie) => (
          <Movie key={movie._id} movie={movie} />
        ))}
      </div>
    </>
  );
};

export default Movies;
