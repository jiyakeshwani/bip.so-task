import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Header from "./Header";

function SingleMovie(props) {
  let { id } = useParams();
  console.log(id);
  let [movie, setMovie] = useState("");

  function getMovie() {
    let url = `https://movie-task.vercel.app/api/movie?movieId=${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((movie) => {
        setMovie(movie.data);
        console.log(movie.data.genres[0].name);
      });
  }

  useEffect(() => {
    getMovie();
  }, [movie]);

  return (
    <>
      <Header />
      <figure className="poster">
        <img
          className="img"
          src={`https://image.tmdb.org/t/p/original` + movie.backdrop_path}
          alt="movie"
        />
      </figure>
      <div className="container">
        <h2>{movie.title}</h2>

        {Array.isArray(movie.genres) &&
          movie.genres.map((genre) => {
            return <span className="info">{genre.name}</span>;
          })}

        <p className="tagline">{movie.tagline}</p>
        <p className="info">
          Runtime: {movie.runtime}min | Release Date: {movie.release_date}
        </p>

        <p className="overview">{movie.overview}</p>
        <p className="language">Language: {movie.original_language}</p>
      </div>
    </>
  );
}

export default SingleMovie;
