import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

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
      <div className="featured">Popular Movies</div>
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

/* function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>TMDB</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
*/
