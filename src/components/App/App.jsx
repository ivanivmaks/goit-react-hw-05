import { Route, Routes } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import MoviesPage from "../../pages/MoviesPage/MoviesPage";
import Navigation from "../Navigation/Navigation";
import MovieDetailsPage from "../../pages/MovieDetailsPage/MovieDetailsPage";
import css from "./App.module.css";

export default function App() {
  return (
    <div className={css.container}>
      <Navigation/>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={ <MovieDetailsPage/>} />
      </Routes>
    </div>
  );
}
