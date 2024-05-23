import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Navigation from "../Navigation/Navigation";
import MovieCast from "../MovieCast/MovieCast";
import MovieReviews from "../MovieReviews/MovieReviews";
import css from "./App.module.css";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("../../pages/MovieDetailsPage/MovieDetailsPage")
);

export default function App() {
  return (
    <div className={css.container}>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route />
        </Routes>
      </Suspense>
    </div>
  );
}
