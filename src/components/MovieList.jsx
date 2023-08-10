import React from "react";

const MovieList = (props) => {
  return (
    <>
      {props.title.map((movies) => {
        return <div>{movies.title}</div>;
      })}
    </>
  );
};

export default MovieList;
