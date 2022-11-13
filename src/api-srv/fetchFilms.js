import axios from "axios";

const API_KEY = `9592c8603df8e5126363400a6e9798f8`;

export async function fetchFilmsTrending () {
  const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`;
  const response = await axios.get(url);
  return response.data.results;
}

export async function fetchFilmsSearch (searchQueryInput) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchQueryInput}&page=1&include_adult=false`;
    const search = await axios.get(url);
    return search.data.results;
}

export async function fetchFilmsDetails (id) {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`;
    const detail = await axios.get(url);
    return detail.data;
}

export async function fetchFilmsCredits (id) {
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`;
    const credits = await axios.get(url);
    return credits.data.cast;
}

export async function fetchFilmsReviews (id) {
    const url = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=9592c8603df8e5126363400a6e9798f8&language=en-US&page=1`;
    const review = await axios.get(url);
    return review.data.results;
}

