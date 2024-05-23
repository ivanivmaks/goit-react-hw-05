import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ films }) {
    const location = useLocation();
  return (
    <ul className={css.list}>
      {films.map((film) => (
        <li key={film.id} className={css.item}>
          <Link
            to={`/movies/${film.id}`}
            state={{ from: location }}
            className={css.link}
          >
            {film.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
