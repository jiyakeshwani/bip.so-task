import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Loader from "./Loader";
import Filter from "./Filter";

function Movies(props) {
  let [activePage, setActivePage] = useState(1);
  let [movies, setMovies] = useState([]);
  let [date, setDate] = useState("");
  let [releasedYears, setReleasedYears] = useState([]);

  const [filteredMovies, setFilteredMovies] = useState([]);
  function handleFilter(event) {
    console.log("hello");
    setDate(event.target.value);
  }

  function fetchMovies() {
    const baseUrl = `https://movie-task.vercel.app/api/popular?page=${activePage}`;
    fetch(baseUrl)
      .then((res) => res.json())
      .then((data) => {
   
        const getYears = data.data.results.reduce((acc, cv) => {
          let year = new Date(cv.release_date).getFullYear();

          if (!acc.includes(year) && year) {
            acc.push(year);
          }
          return acc;
        }, []);
       
        setMovies(data.data.results);
        setReleasedYears(getYears);
      });
  }

  let pages = [];
  for (let i = 1; i <= 100; i++) {
    pages.push(i);
  }

  useEffect(() => {
    fetchMovies();
  }, [activePage]);
  console.log(date);
  useEffect(() => {
    if (date) {
      handleFilteredMovies();
    }
  }, [date]);
  function handleFilteredMovies() {
    let filteredMovies = movies.filter((movie) => {
      let year = new Date(movie.release_date).getFullYear();

      return +date === year;
    });
    console.log(filteredMovies);
    setFilteredMovies(filteredMovies);
  }


  let data = date ? filteredMovies : movies;

  return (
    <>
      <div className="container">
        <Filter
          date={date}
          handleFilter={handleFilter}
          releasedYears={releasedYears}
        />
      </div>
      <div className="container movie-wrapper">
        {!data ? (
          <Loader />
        ) : (
          <>
            {data.map((movie) => {
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
