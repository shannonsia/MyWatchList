import { useState } from "react";
import { useEffect } from "react";
import "./App.css";

function Carousel() {
  const [currentTVIndex, setCurrentTVIndex] = useState(0);
  const [TV, setTV] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

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
        "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
        options
      );
      const responseJSON = await response.json();
      console.log(responseJSON);
      setTV(responseJSON.results);
    }

    fetchData();
  }, []);

  var currentTV = TV[currentTVIndex];

  if (!currentTV) {
    return <div>No TV</div>;
  }

  const handleClick = (direction) => {
    if (direction === "next") {
      if (currentTVIndex === 19) {
        setCurrentTVIndex(currentTVIndex - 19);
      } else {
        setCurrentTVIndex(currentTVIndex + 1);
      }
    } else {
      if (currentTVIndex === 0) {
        setCurrentTVIndex(currentTVIndex + 19);
      } else {
        setCurrentTVIndex(currentTVIndex - 1);
      }
    }
  };

  const handleAddToWatchlist = (TV) => {
    if (watchlist.includes(TV.name)) {
      return;
    }

    setWatchlist([...watchlist, movie.name]);
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
          src={`https://image.tmdb.org/t/p/w500${currentTV.backdrop_path}`}
        ></img>

        <div className="content">
          <div className="content-text">
            <h1>{currentTV.name}</h1>
            <div className="movie-rating">
              <img src="./images/imdb.png" style={{ height: "15px" }}></img>

              <div>{currentTV.vote_count} votes</div>
            </div>
            <p>{currentTV.overview}</p>
            <button
              className="watchlist-button"
              onClick={() => handleAddToWatchlist(currentTV)}
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
        "https://api.themoviedb.org/3/trending/tv/day?language=en-US",
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
          name={topOne?.name}
          rating={topOne?.vote_average}
          genre={topOne?.genre_ids}
        ></IndividualMovie>
        <IndividualMovie
          poster={topTwo?.poster_path}
          name={topTwo?.name}
          rating={topTwo?.vote_average}
          genre={topTwo?.genre_ids}
        ></IndividualMovie>
        <IndividualMovie
          poster={topThree?.poster_path}
          name={topThree?.name}
          rating={topThree?.vote_average}
          genre={topThree?.genre_ids}
        ></IndividualMovie>
        <IndividualMovie
          poster={topFour?.poster_path}
          name={topFour?.name}
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

function TVShow() {
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
        <h2>Trending TV Shows</h2>
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

export default TVShow;
