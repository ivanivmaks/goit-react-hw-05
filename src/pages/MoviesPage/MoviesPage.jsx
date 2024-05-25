import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchSearch } from "../../API";
import SearchMovieForm from "../../components/SearchMovieForm/SearchMovieForm";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchFilms, setSearchFilms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noMovies, setNoMovies] = useState(false);

  const movieQuery = searchParams.get("query") || "";

  useEffect(() => {
    if (movieQuery) {
      searchMovies(movieQuery);
    }
  }, [movieQuery]);

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

  const handleSearch = (movie) => {
    setSearchParams({ query: movie });
  };

  return (
    <div>
      <SearchMovieForm onSearch={handleSearch} />
      {loading && <Loader />}
      {noMovies && (
        <p>There is no movies with this request. Please, try again</p>
      )}
      {searchFilms && <MovieList films={searchFilms} />}
    </div>
  );
}
