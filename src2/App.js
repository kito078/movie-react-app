import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import MovieList from "./components/MoviesList";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films");
      //lets check if the response is oky before we even try to pass the response body
      //the exact way of handling the error response depend on the api u are talking to
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
      //setIsLoading(false);
    } catch (error) {
      setError(error.message);
      //setIsLoading(false)
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MovieList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>Found no movies</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;

// import React, { useState } from "react";
// import "./App.css";
// import MovieList from "./components/MoviesList";

// function App() {
//   const [movies, setMovies] = useState([]);
//   //when the app component render to the screen we are not loading data
//   const [isLoading, setIsLoading] = useState(false);

//   async function fetchMoviesHandler() {
//     //but wen you click the button and call fetchMoviesHandler wen the function starts to execute
//     //start wen we want to show the loading and setIsLoading to true
//     setIsLoading(true);
//     //sending http request is asyncness task, it doesnt finish immediately it can take a couple of seconds, it can even fail
//     const response = await fetch("https://swapi.dev/api/films");
//     const data = await response.json();
//     // .then((response) => {
//     //   return response.json();
//     // })
//     // .then((data) => {
//     //   console.log(data);
//     //converting data to our own names
//     const transformedMovies = data.results.map((movieData) => {
//       return {
//         id: movieData.episode_id,
//         title: movieData.title,
//         openingText: movieData.opening_crawl,
//         releaseDate: movieData.release_date,
//       };
//     });
//     setMovies(transformedMovies);
//     //we are not loading anymore we got some data
//     setIsLoading(false);
//     // });
//   }

//   return (
//     <React.Fragment>
//       <section>
//         <button onClick={fetchMoviesHandler}>Fetch Movies</button>
//       </section>
//       <section>
//         {/* we want to show this data, these movies wen we are nolonger loading */}
//         {!isLoading && movies.length > 0 && <MovieList movies={movies} />}
//         {!isLoading && movies.length === 0 && <p>Found no movies</p>}
//         {isLoading && <p>loading...</p>}
//       </section>
//     </React.Fragment>
//   );
// }

// export default App;
