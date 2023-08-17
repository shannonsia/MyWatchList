import "./App.css";

function Navigation() {
  function test() {
    console.log("TEST");
  }
  return (
    <>
      <div className="navigation">
        <div className="nav-links">
          <button onClick={() => test()}>TEST</button>
          <a>Movies</a>
          <a>TV Shows</a>
          <a>My List</a>
        </div>
      </div>
    </>
  );
}

export default Navigation;
