import { useParams, Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { fetchMovieDetails } from "../../API";
import Loader from "../../components/Loader/Loader";
import css from "./MovieDetailsPage.module.css";

function convertMinutes(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainMinutes = minutes % 60;
  return `${hours} hours ${remainMinutes} minutes`;
}

const getLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const getBackLink = useRef(location.state?.from ?? "/");
  const [movieInfo, setMovieInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const movieDetails = () => {
      setLoading(true);
      fetchMovieDetails(movieId)
        .then((movieDetail) => setMovieInfo(movieDetail))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    };

    movieDetails();
  }, [movieId]);

  if (!movieInfo) {
    return;
  }

  const {
    original_title,
    release_date,
    popularity,
    overview,
    genres,
    poster_path,
    runtime,
  } = movieInfo;

  const convertRuntime = convertMinutes(runtime);

  return (
    <>
      <Link to={getBackLink.current}>
        <button className={css.button}>Go back</button>
      </Link>
      {movieInfo && (
        <div className={css.container}>
          <img
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
            }
            alt={original_title}
            className={css.image}
          />
          <div className={css.infoList}>
            <h2>
              {original_title} ({release_date.slice(0, 4)})
            </h2>
            <p className={css.parag}>
              User score: <span className={css.span}> {popularity}</span>
            </p>
            <h3>Overview</h3>
            <p>{overview}</p>
            <h3>Genres</h3>
            <ul className={css.list}>
              {genres.map((genre) => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
            <p className={css.parag}>
              Runtime: <span className={css.span}>{convertRuntime}</span>
            </p>
          </div>
        </div>
      )}
      <div>
        <h3 className={css.addTitle}>Additional information</h3>
        <ul className={css.addList}>
          <li>
            <NavLink to="cast" className={getLinkClass}>
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink to="reviews" className={getLinkClass}>
              Reviews
            </NavLink>
          </li>
        </ul>
        <Outlet />
      </div>
      {loading && <Loader />}
    </>
  );
}
