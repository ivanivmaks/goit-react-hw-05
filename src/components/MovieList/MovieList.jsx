import { Link } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ films }) {
  return (
    <ul className={css.list}>
      {films.map((film) => (
        <li key={film.id} className={css.item}>
          <Link to={`/movies/${film.id}`} className={css.link}>
            {film.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
