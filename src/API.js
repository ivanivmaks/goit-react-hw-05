import axios from "axios";

const API_KEY = "0185f22755e1b770d06fb9bdfc18894f";
axios.defaults.baseURL = "https://api.themoviedb.org/3/";
axios.defaults.params = {
  api_key: API_KEY,
  language: "en-US",
  page: 1,
  include_adult: false,
};

export const fetchTrendings = async () => {
  const response = await axios.get("trending/movie/day");
  return response.data.results;
};

export const fetchSearch = async () => {
  const response = await axios.get(`movie`);
  return response.data.results;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await axios.get(`movie/${movieId}`);
  return response.data;
};

export const fetchActors = async (movieId) => {
  const response = await axios.get(`movie/${movieId}/credits`);
  return response.data.results;
};

export const fetchReviews = async (movieId) => {
  const response = await axios.get(`movie/${movieId}/reviews`);
  return response.data.results;
};
