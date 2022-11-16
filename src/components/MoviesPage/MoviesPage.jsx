import { useSearchParams, useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchFilmsSearch } from 'api-srv/fetchFilms';
import {
  SearchbarHead,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './MoviesPage.styled';
import { FcSearch } from 'react-icons/fc';
import { toast } from 'react-toastify';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');

  const handleSubmit = e => {
    e.preventDefault();
    setSearchParams({ query: e.currentTarget.elements.query.value });

    if (e.currentTarget.elements.query.value.trim() === '') {
      toast.error('Все пропало, пиши наново!', { position: 'top-center' });
      return;
    }
    e.currentTarget.reset();
  };

  useEffect(() => {
    if (query === null) {
      return;
    }

    async function SearchFilms() {
      try {
        const cardSearch = await fetchFilmsSearch(query);
        if (cardSearch.length === 0) {
          alert(`за запитом "${query}", фільмів не знайдено`);
        }
        setMovies(cardSearch);
      } catch (error) {
        toast.error('Все пропало!', { position: 'top-center' });
      }
    }

    SearchFilms();
  }, [query]);

  return (
    <>
      <SearchbarHead>
        <SearchForm onSubmit={handleSubmit}>
          <SearchFormButton type="submit">
            <FcSearch size={18} /> <span>Search</span>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movies"
            name="query"
          />
        </SearchForm>
      </SearchbarHead>

      {movies.length > 0 && (
        <ul>
          {movies.map(({ id, title }) => (
            <li key={id}>
              <Link to={`/movies/${id}`} state={{ from: location }}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}