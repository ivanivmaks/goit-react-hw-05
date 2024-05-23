import { Formik, Form, Field } from "formik";
import css from "./SearchMovieForm.module.css";

const initialValues = {
  movie: "",
};

export default function SearchMovieForm({ onSearch }) {
  const handleSearch = (values, { resetForm }) => {
    onSearch(values.movie.toLowerCase());
    resetForm();
  };
  return (
    <Formik initialValues={initialValues} onSubmit={handleSearch}>
      <Form className={css.form}>
        <Field
          type="text"
          name="movie"
          autoComplete="off"
          autoFocus
          className={css.input}
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </Form>
    </Formik>
  );
}
