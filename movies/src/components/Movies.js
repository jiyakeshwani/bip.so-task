import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Loader from "./Loader";
import Filter from "./Filter";

function Movies(props) {
  let [activePage, setActivePage] = useState(1);
  let [movies, setMovies] = useState([]);
  let [date, setDate] = useState("");

  function handleFilter(event) {
    setDate(event.target.value);
  }

  function fetchMovies() {
    const baseUrl = `https://movie-task.vercel.app/api/popular?page=${activePage}`;
    fetch(baseUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data.data.results);
      });
  }

  let pages = [];
  for (let i = 1; i <= 100; i++) {
    pages.push(i);
  }

  useEffect(() => {
    fetchMovies();
  }, [movies]);

  function handleFilteredMovies(date, movies) {
    let moviesArr = [...movies];
    console.log(moviesArr);
    moviesArr.map((movie) => {
      let year = movie.release_date.split("-")[0];

      if (year == date) {
        console.log(movie.title);
        moviesArr = { ...movie };
      }

      // let allMovies = moviesArr.push(movie);
      console.log([moviesArr]);
      return moviesArr;
    });
  }

  handleFilteredMovies("2022", movies);

  return (
    <>
      <div className="container">
        <Filter date={date} handleFilter={handleFilter} />
      </div>
      <div className="container movie-wrapper">
        {movies === null ? (
          <Loader />
        ) : (
          <>
            {movies.map((movie) => {
              return (
                <div className="movie" id="top">
                  <NavLink to={`/movies/${movie.id}`}>
                    <div>
                      <img
                        src={
                          `https://image.tmdb.org/t/p/original` +
                          movie.poster_path
                        }
                        alt="movie-img"
                      />
                    </div>
                  </NavLink>
                </div>
              );
            })}
          </>
        )}
      </div>
      <div className="container pagination">
        {pages.map((page) => {
          return (
            <button
              onClick={() => setActivePage(page)}
              className={activePage === page ? "active" : "page-btn"}
            >
              <a href="#top"> {page}</a>
            </button>
          );
        })}
      </div>
    </>
  );
}

export default Movies;
