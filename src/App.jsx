import { useState } from "react";
import { useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import MovieList from "./components/MovieList";

function Carousel() {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=37041a8a2209f8220b79933725b679a9",
        {
          method: "GET",
        }
      );

      const responseJSON = await response.json();
      setMovies(responseJSON.results);
    }

    fetchData();
  }, []);
  var currentMovie = movies[currentMovieIndex];

  if (!currentMovie) {
    return <div>No movies</div>;
  }

  const handleClick = (direction) => {
    if (direction === "next") {
      if (currentMovieIndex === 19) {
        setCurrentMovieIndex(currentMovieIndex - 19);
      } else {
        setCurrentMovieIndex(currentMovieIndex + 1);
      }
    } else {
      if (currentMovieIndex === 0) {
        setCurrentMovieIndex(currentMovieIndex + 19);
      } else {
        setCurrentMovieIndex(currentMovieIndex - 1);
      }
    }
  };

  const handleAddToWatchlist = (movie) => {
    if (watchlist.includes(movie.title)) {
      return;
    }

    setWatchlist([...watchlist, movie.title]);
  };

  return (
    <div>
      <div className="gallery">
        <img
          className="backdrop"
          src={`https://image.tmdb.org/t/p/w500${currentMovie.backdrop_path}`}
        ></img>

        <div className="content">
          <button
            type="button"
            className="previous-button"
            onClick={() => handleClick("previous")}
          >
            <img src="/images/chevron-right.svg"></img>
          </button>

          <div className="content-text">
            <h2>{currentMovie.title}</h2>
            <p>{currentMovie.overview}</p>
            <button
              className="watchlist"
              onClick={() => handleAddToWatchlist(currentMovie)}
            >
              ADD TO WATCHLIST
            </button>
          </div>

          <button
            type="button"
            className="next-button"
            onClick={() => handleClick("next")}
          >
            <img src="/images/chevron-right.svg"></img>
          </button>
        </div>
      </div>

      <div className="watchlist">
        <h3>Watchlist:</h3>
        {watchlist.map((movie) => {
          return movie;
        })}
      </div>
    </div>
  );
}

function Featured() {
  const [topRated, setTopRated] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzA0MWE4YTIyMDlmODIyMGI3OTkzMzcyNWI2NzlhOSIsInN1YiI6IjY0YmU3YTVlYjg2NWViMDBlMjA3NzJjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7h_nhp6EyNVeRVAiGMhRXGapKSJIaYzxwudAbuqNG28",
        },
      };

      const response = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
        options
      );
      console.log("FEATURED MOVIES");
      const responseJSON = await response.json();
      setTopRated(responseJSON.results);
    }
    fetchData();
  }, []);

  var topOne = topRated[0];
  var topTwo = topRated[1];
  var topThree = topRated[2];
  var topFour = topRated[3];

  console.log(topOne);

  function IndividualMovie({ poster, name, rating, genre }) {
    return (
      <>
        <section>
          <img src={poster}></img>
          <h4>{name}</h4>
          <div className="movie-rating">
            <img src="./images/imdb.png" style={{ height: "15px" }}></img>
            <div>{rating}/10</div>
          </div>
          <div>{genre}</div>
        </section>
      </>
    );
  }

  return (
    <>
      <div className="top-rated">
        <IndividualMovie
          name={topOne?.title}
          rating={topOne?.vote_average}
        ></IndividualMovie>
        <IndividualMovie
          name={topTwo?.title}
          rating={topTwo?.vote_average}
        ></IndividualMovie>
        <IndividualMovie
          name={topThree?.title}
          rating={topThree?.vote_average}
        ></IndividualMovie>
        <IndividualMovie
          name={topFour?.title}
          rating={topFour?.vote_average}
        ></IndividualMovie>
      </div>
    </>
  );
}

/*

  return (
    <>
      <div>Hello</div>
      <div>{topOne.title}</div>
      <img src={`https://image.tmdb.org/t/p/w500${topOne.poster_path}`}></img>
      <IndividualMovie></IndividualMovie>
    </>
  );
*/

function App() {
  return (
    <>
      <div className="navigation">
        <div>MyWatchList</div>
        <div className="nav-links">
          <a>Movies</a>
          <a>TV Shows</a>
          <a>My List</a>
        </div>
      </div>
      <div>
        <Carousel></Carousel>
      </div>
      <div className="featured">
        <h2>Top Rated Movies</h2>
        <Featured></Featured>
      </div>
      <div className="footer">
        <div className="footer-links">
          <a>Conditions of Use</a>
          <a>Privacy & Policy</a>
          <a>Press Room</a>
        </div>
        <a>{"\u00a9"}2023 MovieBox by Shannon Sia</a>
      </div>
    </>
  );
}

export default App;
