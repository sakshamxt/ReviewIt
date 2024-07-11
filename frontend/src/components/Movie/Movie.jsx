import React from "react";
import { Link } from "react-router-dom";

const Movie = ({ movie }) => {
  return (
    <>
      <Link to={`/movie/${movie._id}`} className="m-[0.55rem] rounded-md hover:scale-[1.04] transition-all duration-200">
        <article className="w-[12rem] shadow-black shadow-sm relative h-[18rem] rounded-md place-items-center">
          <img
            className="object-cover w-full h-full rounded-md"
            src={movie.image_url}
            alt="Photo of Cartagena's cathedral at the background and some colonial style houses"
            width="1920"
            height="2193"
          />
          <div className="absolute bottom-0 rounded-bl-md rounded-br-md w-full h-16 bg-gradient-to-t from-black via-black/80 to-black/10 flex flex-col justify-end">
            <div className="px-3 py-2">
              <h3 className="font-bold text-lg text-white">{movie.name}</h3>
           </div>
          </div>
        </article>
      </Link>
    </>
  );
};

export default Movie;
