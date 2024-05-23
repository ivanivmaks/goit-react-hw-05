import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchActors } from "../../API";
import Loader from "../Loader/Loader";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCast = () => {
      setLoading(true);
      fetchActors(movieId)
        .then((actors) => setCast(actors))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    };

    fetchCast();
  }, [movieId]);

  return (
      <div className={ css.div}>
      <ul className={css.list}>
        {cast.map(({ id, original_name, profile_path, character }) => (
            <li key={id} className={css.item }>
            <img
              src={
                profile_path
                  ? `https://image.tmdb.org/t/p/w500${profile_path}`
                  : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
              }
              alt={original_name}
              className={css.image} height={375} width={250}
            />
            <p className={css.name}>{original_name}</p>
            <p className={css.character}>Character: {character}</p>
          </li>
        ))}
      </ul>

      {loading && <Loader />}
    </div>
  );
}
