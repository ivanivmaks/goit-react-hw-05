import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchReviews } from "../../API";
import Loader from "../Loader/Loader";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFeedback = () => {
      setLoading(true);
      fetchReviews(movieId)
        .then((feedback) => setReviews(feedback))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    };

    fetchFeedback();
  }, [movieId]);

  return (
    <div className={css.div}>
      {reviews.length !== 0 ? (
        <ul className={css.list}>
          {reviews.map(({ id, content, author }) => (
            <li key={id} >
              <h3 className={css.title}>
                Name: {author}
              </h3>
              <p className={css.info}> {content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={css.text}>
          We don&apos;t have any reviews for this movie
        </p>
      )}

      {loading && <Loader />}
    </div>
  );
}
