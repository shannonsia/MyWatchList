import React from "react";
import ReactDOM from "react-dom/client";
import Homepage from "./Homepage.jsx";
import TVShow from "./TVShow.jsx";

import MyWatchlist from "./Watchlist.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TVShow />
  </React.StrictMode>
);
