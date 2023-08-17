import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import "./Watchlist.jsx";
import MyWatchlist from "./Watchlist.jsx";

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
    <div className="black-screen">
      <div className="gallery">
        <div className="my-watchlist">MY WATCHLIST</div>
        <div className="navigation">
          <div className="nav-links">
            <a>Movies</a>
            <a>TV Shows</a>
            <a>My List</a>
          </div>
        </div>
        <img
          className="backdrop"
          src={`https://image.tmdb.org/t/p/w500${currentMovie.backdrop_path}`}
        ></img>

        <div className="content">
          <div className="content-text">
            <h1>{currentMovie.title}</h1>
            <div className="movie-rating">
              <img src="./images/imdb.png" style={{ height: "15px" }}></img>

              <div>{currentMovie.vote_count} votes</div>
            </div>
            <p>{currentMovie.overview}</p>
            <button
              className="watchlist-button"
              onClick={() => handleAddToWatchlist(currentMovie)}
            >
              ADD TO WATCHLIST
            </button>
          </div>

          <button
            type="button"
            className="previous-button"
            onClick={() => handleClick("previous")}
          >
            <img src="/images/chevron-right.svg"></img>
          </button>

          <button
            type="button"
            className="next-button"
            onClick={() => handleClick("next")}
          >
            <img src="/images/chevron-right.svg"></img>
          </button>
        </div>
      </div>
    </div>
  );
}

function Genre() {
  const [genreList, setGenre] = useState([]);

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
        "https://api.themoviedb.org/3/genre/movie/list?language=en",
        options
      );
      const responseJSON = await response.json();
      console.log(responseJSON);

      setGenre(responseJSON.results);
    }

    fetchData();
  }, []);
}

function Trending() {
  const [trending, setTrending] = useState([]);

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
        "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
        options
      );
      const responseJSON = await response.json();
      setTrending(responseJSON.results);
    }
    fetchData();
  }, []);

  var topOne = trending[0];
  var topTwo = trending[1];
  var topThree = trending[2];
  var topFour = trending[3];

  function IndividualMovie({ poster, name, rating, genre }) {
    return (
      <>
        <section>
          <img
            src={`https://image.tmdb.org/t/p/w500${poster}`}
            className="movie-poster"
          ></img>
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
      <div className="trending-section">
        <IndividualMovie
          poster={topOne?.poster_path}
          name={topOne?.title}
          rating={topOne?.vote_average}
          genre={topOne?.genre_ids}
        ></IndividualMovie>
        <IndividualMovie
          poster={topTwo?.poster_path}
          name={topTwo?.title}
          rating={topTwo?.vote_average}
          genre={topTwo?.genre_ids}
        ></IndividualMovie>
        <IndividualMovie
          poster={topThree?.poster_path}
          name={topThree?.title}
          rating={topThree?.vote_average}
          genre={topThree?.genre_ids}
        ></IndividualMovie>
        <IndividualMovie
          poster={topFour?.poster_path}
          name={topFour?.title}
          rating={topFour?.vote_average}
          genre={topFour?.genre_ids}
        ></IndividualMovie>
      </div>
    </>
  );
}
/* ADD TO WATCHLIST
<div className="watchlist">
<h3>Watchlist:</h3>
{watchlist.map((movie) => {
  return movie;
})}
</div>

*/

function Homepage() {
  /* const ShowWatchlist = (clicked) => {
    //const [myWatchlist, setMyWatchlist] = useState(false);
    if (clicked === "true") {
      //setMyWatchlist(true);
      return (
        <>
          <div className="test">WATCHLIST SHOWN</div>
        </>
      );
    }
  };

  <div onClick={() => ShowWatchlist("true")}>CLICK</div>
  */
  return (
    <>
      <div>
        <Genre></Genre>
      </div>
      <div>
        <Carousel></Carousel>
      </div>
      <div className="trending">
        <h2>Trending Movies</h2>
        <Trending></Trending>
      </div>
      <div className="footer">
        <div className="footer-links">
          <a>Conditions of Use</a>
          <a>Privacy & Policy</a>
          <a>Press Room</a>
        </div>
        <a style={{ color: "grey" }}>{"\u00a9"}2023 MovieBox by Shannon Sia</a>
      </div>
    </>
  );
}

export default Homepage;
