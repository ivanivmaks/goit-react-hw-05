import { useState, useEffect } from "react";
import { fetchTrendings } from "../../API";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import css from './HomePage.module.css'

export default function HomePage() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrendingFilms = () => {
      setLoading(true);

      fetchTrendings()
        .then((trendingFilms) => setFilms(trendingFilms))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    };
    fetchTrendingFilms();
  }, []);

  return (
    <div>
      <h1 className={css.title}>Trending today</h1>
      <MovieList films={films} />
      {loading && <Loader />}
    </div>
  );
}
