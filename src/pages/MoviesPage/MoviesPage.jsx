import { useState } from "react";
import { fetchSearch } from "../../API";
import SearchMovieForm from "../../components/SearchMovieForm/SearchMovieForm";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";
// import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [searchFilms, setSearchFilms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noMovies, setNoMovies] = useState(false);

  const searchMovies = (movie) => {
    setLoading(true);

    fetchSearch(movie)
      .then((films) => {
        setSearchFilms(films);
        setNoMovies(films.length === 0);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <SearchMovieForm onSearch={searchMovies} />
      {searchFilms && <MovieList films={searchFilms} />}
      {noMovies && (
        <p>There is no movies with this request. Please, try again</p>
      )}
      {loading && <Loader />}
    </div>
  );
}
