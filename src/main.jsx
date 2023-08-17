import React from "react";
import ReactDOM from "react-dom/client";
import Movie from "./Movie.jsx";
import TVShow from "./TVShow.jsx";
import Navigation from "./Navigation";

import MyWatchlist from "./Watchlist.jsx";

import "./index.css";
import { useState } from "react";
import { useEffect } from "react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Navigation />
    <TVShow />
  </React.StrictMode>
);
