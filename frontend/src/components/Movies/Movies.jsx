import React from "react";
import Movie from "../Movie/Movie";

const Movies = ({ movies }) => {
  return (
    <>
      <div className="flex flex-wrap items-center justify-center py-8 px-28">
        {movies.map((movie) => (
          <Movie key={movie._id} movie={movie} />
        ))}
      </div>
    </>
  );
};

export default Movies;
